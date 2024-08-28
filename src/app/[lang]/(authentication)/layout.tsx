//@3rd Party
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n';
// ___________________________________________________________________

//@Components
import { Stack } from '@mui/material';
import KaizenAppBar from '@/Layouts/main-layout/components/KaizenAppBar';
// ___________________________________________________________________

//@Server Functions
export async function generateStaticParams() {
    return i18n.locales.map((locale: Locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
    title: 'Kaizen',
    description: 'Manage your tasks in Kaizen style',
};
// ___________________________________________________________________

export default function RootLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: { lang: Locale };
}) {
    return (
        <>
            <Stack height='100%' width='100%'>
                <KaizenAppBar />
                <Stack
                    component={'main'}
                    flexGrow={1}
                    height={'100%'}
                    width={'100%'}
                >
                    {children}
                </Stack>
            </Stack>
        </>
    );
}
