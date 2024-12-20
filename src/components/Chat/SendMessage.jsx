import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { ChatComposite, fromFlatCommunicationIdentifier, useAzureCommunicationChatAdapter } from '@azure/communication-react';
import React, { useMemo, useEffect, useState, useRef } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { createTheme } from '@fluentui/react';
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const defaultTheme = createTheme({
    palette: {
        themePrimary: '#0078d4',
        themeSecondary: '#2b88d8',
    },
});

const SendMessage = ({ token, typeID, threads }) => {
    const [chatTokenForm, setChatTokenForm] = useState({ chat_id: '', chat_token: '', expiration_time_token: '' });
    const [threadId, setThreadId] = useState('');
    const [loading, setLoading] = useState(true);

    const hasFetchedData = useRef(false);

    useEffect(() => {
        if (hasFetchedData.current) return;

        setLoading(true);
        hasFetchedData.current = true;

        const fetchChatData = async () => {
            try {
                const { data: chatTokenResponse } = await axios.get(`${apiUrl}/api/v1/chat/token/`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                setChatTokenForm(chatTokenResponse);

                // بررسی وجود threads
                if (threads) {
                    setThreadId(threads);
                } else {
                    const chatThreadResponse = await fetch(`${apiUrl}/api/v1/chat/new/`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                        body: JSON.stringify({ type_id: typeID }),
                    });
                    if (!chatThreadResponse.ok) {
                        throw new Error('Failed to create new chat thread');
                    }
                    const chatThreadData = await chatThreadResponse.json();
                    setThreadId(chatThreadData.thread_id);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChatData();
    }, [threads]);

    const credential = useMemo(() => {
        if (!chatTokenForm.chat_token) return undefined;
        try {
            return new AzureCommunicationTokenCredential(chatTokenForm.chat_token);
        } catch (error) {
            console.error('Failed to construct token credential', error);
            return undefined;
        }
    }, [chatTokenForm.chat_token]);

    const displayNameState = 'test'; // Static display name

    const adapter = useAzureCommunicationChatAdapter({
        endpoint: "https://vitruvian-pt-communication-service.switzerland.communication.azure.com/",
        userId: useMemo(() => fromFlatCommunicationIdentifier(chatTokenForm.chat_id), [chatTokenForm.chat_id]),
        displayName: displayNameState,
        credential,
        threadId,
    });

    if (loading) {
        return <CircularProgress sx={{ position: 'relative', left: '50%', transform: 'translate(-50%)' }} />;
    }

    if (!adapter) {
        return <Box>Failed to construct chat adapter</Box>;
    }

    return (
        <Box sx={{ display: 'flex', height: '70vh' }}>
            <ChatComposite
                adapter={adapter}
                fluentTheme={defaultTheme}
                rtl={false}
                options={{
                    errorBar: true,
                    participantPane: true,
                    topic: true,
                    richTextEditor: true,
                }}
                locale={null}
            />
        </Box>
    );
};

export default SendMessage;

