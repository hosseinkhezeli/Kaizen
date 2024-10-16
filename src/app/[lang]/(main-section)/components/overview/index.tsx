'use client';
//@Mui
import { Container, LinearProgress, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//@Component & Methods
import useOverview from '@/app/[lang]/(main-section)/hooks/useOverview';
import GameCard from '@/app/[lang]/(main-section)/components/overview/components/game-card/GameCard';
import { BoardsList } from '@/app/[lang]/(main-section)/components/overview/components/overview-boards/BoardsList';
import Events from '@/app/[lang]/(main-section)/components/overview/components/overview-events/EventsList';
import Ads from '@/app/[lang]/(main-section)/components/overview/components/ads-card/Ads';
import { TaskCardList } from '@/app/[lang]/(main-section)/components/overview/components/overview-task-cards/TaskCardList';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//@Types
import { TDashboard } from '@i18n/dictionary/types/dashboard';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Overview = ({ dictionary }: { dictionary: TDashboard }) => {
    const { isLoadingDashboard, dashboardRes, overviewInfo } = useOverview();
    const HEADER_HEIGHT = document?.getElementById('breadcrumbs')?.clientHeight;

    return (
        <>
            <Stack
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: '1rem 0 2rem',
                    height: `calc(100vh - ${HEADER_HEIGHT || 53}px)`,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Container
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        height: '100%',
                    }}
                >
                    <Typography
                        variant={'h1'}
                        component={'h3'}
                        fontWeight={400}
                    >
                        {dictionary.overview}
                        <Typography variant={'subtitle1'} fontWeight={400}>
                            Effortlessly organize and prioritize your tasks to
                            boost productivity and achieve your goals.
                        </Typography>
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gap: 2,
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gridTemplateRows: '1fr 1fr 1fr',
                            gridAutoFlow: 'dense',
                            overflowY: 'auto',
                            flexGrow: 1,
                            maxHeight: '882px',
                        }}
                    >
                        <BoardsList
                            isLoading={isLoadingDashboard}
                            boards={dashboardRes?.data?.boards}
                        />
                        <Events
                            count={dashboardRes?.count}
                            isLoading={isLoadingDashboard}
                            boards={dashboardRes?.data?.boards}
                        />
                        <TaskCardList
                            cards={dashboardRes?.data?.cards}
                            isLoadingTasks={isLoadingDashboard}
                        />

                        {/*<time-card />*/}
                        <GameCard />
                        <Ads />
                    </Box>
                </Container>
            </Stack>

            {isLoadingDashboard && (
                <LinearProgress
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        zIndex: 9999,
                    }}
                />
            )}
        </>
    );
};

export default Overview;
