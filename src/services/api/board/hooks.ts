import {
  createBoard,
  getBoard,
  getDashboard,
} from '@/services/api/board/services';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetDashboard = ({ userId }: IGetDashboardParamsDTO) =>
  useQuery({
    queryKey: ['get-dashboard', userId],
    queryFn: () => getDashboard({ userId }),
    staleTime: 10000,
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });

export const useGetBoard = ({ boardId }: IGetBoardParamsDTO) =>
  useQuery({
    queryKey: ['get-board', boardId],
    queryFn: () => getBoard({ boardId: boardId }),
    staleTime: 10000,
    enabled: !!boardId,
    refetchOnWindowFocus: false,
  });

export const useCreateBoard = () =>
  useMutation({
    mutationFn: (body: ICreateBoardDTO) => createBoard(body),
    mutationKey: ['create-board'],
  });
