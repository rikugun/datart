/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { LoadingOutlined } from '@ant-design/icons';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { BoardProvider } from '../DashBoardPage/components/BoardProvider';
import FullScreenPanel from '../DashBoardPage/components/FullScreenPanel';
import AutoBoardCore from '../DashBoardPage/pages/Dashboard/AutoDashboard/AutoBoardCore';
import FreeBoardCore from '../DashBoardPage/pages/Dashboard/FreeDashboard/FreeBoardCore';
import { makeSelectBoardConfigById } from '../DashBoardPage/pages/Dashboard/slice/selector';
import { BoardState } from '../DashBoardPage/pages/Dashboard/slice/types';
export interface BoardPageItemProps {
  boardId: string;
}
export const BoardPageItem: React.FC<BoardPageItemProps> = memo(
  ({ boardId }) => {
    const dashboard = useSelector((state: { board: BoardState }) =>
      makeSelectBoardConfigById()(state, boardId),
    );
    if (!dashboard)
      return (
        <div>
          loading <LoadingOutlined />
        </div>
      );
    let boardType = dashboard?.config?.type;
    return (
      <BoardProvider
        board={dashboard}
        editing={false}
        autoFit={false}
        renderMode={'share'}
      >
        <Wrapper>
          {boardType === 'auto' && <AutoBoardCore boardId={dashboard.id} />}
          {boardType === 'free' && <FreeBoardCore boardId={dashboard.id} />}
          <FullScreenPanel />
        </Wrapper>
      </BoardProvider>
    );
  },
);
const Wrapper = styled.div<{}>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;

  padding-bottom: 0;

  background-color: ${p => p.theme.bodyBackground};
`;
