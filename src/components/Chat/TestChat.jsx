    import React, { useEffect } from 'react';
    import {
        FluentThemeProvider,
        ChatClientProvider,
        ChatThreadClientProvider,
        createStatefulChatClient,
        usePropsFor,
        MessageThread,
        SendBox,
        DEFAULT_COMPONENT_ICONS,
    } from '@azure/communication-react';
    import { initializeIcons, registerIcons } from '@fluentui/react';
    import { Box, Container } from '@mui/material';
    import { AzureCommunicationTokenCredential } from '@azure/communication-common';

    const Token = import.meta.env.VITE_CODE_ID;

    initializeIcons();
    registerIcons({ icons: DEFAULT_COMPONENT_ICONS });

    const ChatComponents = () => {
        const messageThreadProps = usePropsFor(MessageThread);
        const sendBoxProps = usePropsFor(SendBox);

        return (
            <Box display="flex" flexDirection="column" height="90vh" p={2}>
                <Box overflow="auto" flex="1">{messageThreadProps && <MessageThread {...messageThreadProps} />}</Box>
                {sendBoxProps && <SendBox {...sendBoxProps} />}
            </Box>
        );
    };

    const App = () => {
        const endpointUrl = 'https://vitruvian-pt-communication-service.switzerland.communication.azure.com';
        const userAccessToken =         'eyJhbGciOiJSUzI1NiIsImtpZCI6IjExRkNCRjhEQzBFRTMzQUY3QkIwQTE3OUUzNjI0RUNBNjk1ODE2NjQiLCJ4NXQiOiJFZnlfamNEdU02OTdzS0Y1NDJKT3ltbFlGbVEiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOmFkMDNjYWU0LWE1NTItNDU5ZS1iZjhlLWUzZjA1MmI1NGU3N18wMDAwMDAyMy0xNzE0LWU5YmUtMDM2OS1kYTNhMGQwMDdkOTEiLCJzY3AiOjE3OTIsImNzaSI6IjE3Mjg1NzY3MDIiLCJleHAiOjE3Mjg2NjMxMDIsInJnbiI6ImNoIiwiYWNzU2NvcGUiOiJjaGF0LHZvaXAiLCJyZXNvdXJjZUlkIjoiYWQwM2NhZTQtYTU1Mi00NTllLWJmOGUtZTNmMDUyYjU0ZTc3IiwicmVzb3VyY2VMb2NhdGlvbiI6InN3aXR6ZXJsYW5kIiwiaWF0IjoxNzI4NTc2NzAyfQ.ABlsYNHFH9MYqyN0mwxJJbxAG6saNwywY3TQ7KK6Ymw9iSyZrR1Rwi2ndLMmH6OZWgviC_qULVHNo1BhTR3lY1NIMpEK_-oJp3DBL02QdStRfXZlRJVE9q0pI5GjXZbfq9VUXYGYmHmCrl9fihM3zkxeKJv2BXFSnVEjhKLEm0GjZtSyg_mCB5E891GxBcx2SLQls7JtEGncl4YfYUpobO7lg0Nka5UDT-M0grXnukHVir6fGeiajdLU2Da-GckFbOjfINB6zCgh9QftxrhQdamSYazlWqEtd9-8jmWz0xe16v07jLL50jSz0NRJvfqEzzvWFN7ByIdjTc09UAol8w';
        const userId =         '8:acs:ad03cae4-a552-459e-bf8e-e3f052b54e77_00000023-1714-e9be-0369-da3a0d007d91';
        const threadId =         '19:acsV1_3LlCJsk41_uG9ecBt-59yd6eBJODdBqUioal9tKzJ3k1@thread.v2';
        const tokenCredential = new AzureCommunicationTokenCredential(userAccessToken);

        const statefulChatClient = createStatefulChatClient({
            userId: { communicationUserId: userId },
            displayName: 'Test-User',
            endpoint: endpointUrl,
            credential: tokenCredential,
        });

        useEffect(() => {
            const chatThreadClient = statefulChatClient.getChatThreadClient(threadId);
            statefulChatClient.startRealtimeNotifications();
            chatThreadClient.getProperties();
        }, [statefulChatClient, threadId]);

        return (
            <FluentThemeProvider>
                <ChatClientProvider chatClient={statefulChatClient}>
                    <ChatThreadClientProvider chatThreadClient={statefulChatClient.getChatThreadClient(threadId)}>
                        <Container>
                            <ChatComponents />
                        </Container>
                    </ChatThreadClientProvider>
                </ChatClientProvider>
            </FluentThemeProvider>
        );
    };

    export default App;
