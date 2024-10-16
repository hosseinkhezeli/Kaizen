'use client';
//@3rd Party
import { FC } from 'react';
//______________________________________________________________

//@Mui
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
//______________________________________________________________

//@Hooks
import useCustomBottomNavigation from '@components/custom-bottom-navigation/useCustomBottomNavigation';
//______________________________________________________________

//@Types
import { TGlobal } from '@i18n/dictionary/types/global';
type TCustomBottomNavigation = {
    dictionary: TGlobal;
};
//______________________________________________________________

const CustomBottomNavigation: FC<TCustomBottomNavigation> = ({
    dictionary,
}) => {
    const {
        value,
        handleChange,
        direction,
        navigationItems,
        location,
        isPending,
        isSmallScreen,
    } = useCustomBottomNavigation();
    const bNMaxWidth = 290;
    return (
        isSmallScreen && (
            <BottomNavigation
                showLabels
                value={value}
                onChange={handleChange}
                dir={direction}
                sx={{
                    transition: '0.3s ease all',
                    maxWidth: bNMaxWidth,
                    height: 56,
                    left: `calc(50% - ${bNMaxWidth / 2}px)`,
                }}
            >
                {navigationItems.map((item, idx, arr) => (
                    <BottomNavigationAction
                        key={item.href}
                        label={dictionary[item.id]}
                        icon={item.icon}
                        onClick={(e) => handleChange(e, item.id)}
                        showLabel
                        disabled={isPending}
                        aria-label={dictionary[item.id]}
                        className={location === item.id ? 'Mui-selected' : ''}
                        sx={{
                            position: 'relative',
                            ':before': {
                                content: '""',
                                position: 'absolute',
                                top: '10%',
                                right: 0,
                                height: '80%',
                                width: '1px',
                                backgroundColor: 'text.disabled',
                            },
                            ...(arr.length - 2 < idx && {
                                ':before': { display: 'none' },
                            }),
                        }}
                    />
                ))}
            </BottomNavigation>
        )
    );
};

export default CustomBottomNavigation;
