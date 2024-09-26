import { AvatarGroup, Center, HStack, Icon, SkeletonCircle, StackProps, VStack } from '@chakra-ui/react';
import Avatar from 'common/Avatar/Avatar';
import { Text } from 'common/Text/Text';
import { BrandColor, TextColor } from 'constants/theme';
import React from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import ProfilePic from 'assets/img/profile-pic.png'
import { useScreenSize } from 'hooks/useScreen';


interface StatBoxProps {
    icon: React.ReactNode;
    iconBg?: StackProps['bgColor'];
    title: string;
    count: number;
    type: 'variation' | 'profiles';
    variation?: number;
    frequency?: string;
    loading: boolean;
}
function StatBox({ icon, iconBg, title, count, type, variation, frequency, loading }: StatBoxProps) {
    const { isMobile } = useScreenSize()
    return (
        <HStack w='full' spacing='1.5rem' justify='start' align='center'>
            <Center p='1.5rem' bg={iconBg ?? BrandColor.greenGrade} borderRadius='full'>
                {icon}
            </Center>

            <VStack w='max' align='start'>
                <Text size='sm' color={TextColor.grey}>{title}</Text>
                <Text size='3xl' weight={600} color={TextColor.black}>{loading ? '-' : count}</Text>
                {(type === 'variation' && variation) ? (
                    <HStack>
                        {variation >= 0 ? <Icon as={FaArrowUp} color={BrandColor.green} /> : <Icon as={FaArrowDown} color={BrandColor.crimson} />}
                        <Text size='sm' color={variation >= 0 ? BrandColor.green : BrandColor.crimson}>{loading ? '-' : Math.abs(variation)}%</Text>
                        <Text size='sm' color={TextColor.black}>{loading ? '-' : frequency}</Text>
                    </HStack>
                ) : (
                    <HStack>
                        {loading ? (
                            <SkeletonCircle w='2.5rem' h='2.5rem' />
                        ): (
                            <AvatarGroup size = 'md' max = { 4 }>
                                {Array.from({ length: isMobile ? 3 : 4 }).map(e => 
                                    <Avatar name='Ryan Florence' src={ProfilePic} size={['xs', 'xs', 'sm']} />
                                )}
                            </AvatarGroup>
                        )}
                    </HStack>
                )}
            </VStack>
        </HStack>
    )
}

export default StatBox