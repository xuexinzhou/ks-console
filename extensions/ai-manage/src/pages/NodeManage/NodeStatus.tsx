import React from 'react';

import { Text } from '@ks-console/shared';
import { Card, Row, Field } from '@kubed/components';
import { GPU, Service } from '../../icons';

import {
  StyledCol,
  Columns,
  ColumnItem,
  BgColor,
  TextName,
  StatusColor,
  ProgressBarContainer,
  ProgressBlock,
  IconWrap
} from './style';

const ProgressBar = ({ data }: any) => {
  return (
    <ProgressBarContainer>
      {data.map((item: any, index: number) => (
        <ProgressBlock key={index} percentage={item.percentage} color={item.color} />
      ))}
    </ProgressBarContainer>
  );
};

function NodeStatus() {
  const status = [
    { value: 96, label: '正常', className: '' },
    { value: 5, label: '异常', className: 'err' },
    { value: 3, label: '修复中', className: 'info' },
    { value: 2, label: '已下线', className: 'off' },
  ];
  return (
    <Columns>
      <ColumnItem>
        <Card className="flex">
          <TextName>节点数量</TextName>
          <Row>
            <StyledCol span={4}>
              <BgColor>
                <Text icon="nodes" title={100} description="节点" />
              </BgColor>
            </StyledCol>
            <StyledCol span={4}>
              <BgColor>
                <Text
                  icon={() => (
                    <IconWrap>
                      <GPU />
                    </IconWrap>
                  )}
                  title={800}
                  description="GPU"
                />
              </BgColor>
            </StyledCol>
            <StyledCol span={4}>
              <BgColor>
                <Text
                  icon={() => (
                    <IconWrap>
                      <Service />
                    </IconWrap>
                  )}
                  title={788}
                  description="控制平面节点"
                />
              </BgColor>
            </StyledCol>
          </Row>
        </Card>
      </ColumnItem>
      <ColumnItem>
        <Card>
          <TextName>节点服务状态</TextName>
          <Row>
            {status.map((item, index) => (
              <StyledCol key={index} span={3}>
                <BgColor className="padding4">
                  <Field
                    value={item.value}
                    label={<StatusColor className={item.className}>{item.label}</StatusColor>}
                  />
                </BgColor>
              </StyledCol>
            ))}
          </Row>
          <ProgressBar
            data={[
              { percentage: 90, color: '#55BC8A' }, // 红色
              { percentage: 5, color: '#CA2621' }, // 黄色
              { percentage: 3, color: '#329DCE' }, // 绿色
              { percentage: 2, color: '#79879C' }, // 蓝色
            ]}
          />
        </Card>
      </ColumnItem>
    </Columns>
  );
}

export default NodeStatus;
