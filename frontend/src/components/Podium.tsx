// components/NetPodium.tsx
"use client";

import React, { useMemo } from "react";
import type { FC } from "react";
import {
  Card,
  Row,
  Col,
  Avatar,
  Typography,
  Tag,
  List,
  Statistic,
  Tooltip,
  Empty,
} from "antd";
import { CrownFilled } from "@ant-design/icons";

const { Text, Title } = Typography;

export type Competitor = {
  name: string;
  empresa: string;
  points: number;
};

type Props = {
  data: Competitor[];
  title?: string;
};

const companyColor = (empresa: string) => {
  // simple consistent color picker by company
  const colors = [
    "black",
    "#353ed4",
    "orange",
    "gold",
    "green",
    "cyan",
    "#e6443b",
    "geekblue",
    "purple",
  ];
  let hash = 0;
  for (let i = 0; i < empresa.length; i++)
    hash = (hash * 31 + empresa.charCodeAt(i)) >>> 0;
  return colors[hash % colors.length] as any;
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const Podium: FC<Props> = ({ data, title = "Ranking .NET" }) => {
  const { top3, next2 } = useMemo(() => {
    // sort by points desc, then name asc (stable tie-breaker)
    const sorted = [...data].sort(
      (a, b) => b.points - a.points || a.name.localeCompare(b.name)
    );

    return {
      top3: sorted.slice(0, 3),
      next2: sorted.slice(3, 5),
    };
  }, [data]);

  // Podium columns order and heights (2nd, 1st, 3rd)
  const podiumOrder = [1, 0, 2]; // indices into top3 to render visually as: 2nd | 1st | 3rd
  const heights = [270, 320, 240]; // visual variety by column
  const crownColors = ["#FFD700", "#C0C0C0", "#CD7F32"]; // silver, gold, bronze for icon fill

  return (
    <Card className="border-none bg-transparent">
      {top3.length === 0 ? (
        <Empty description="Sem participantes" />
      ) : (
        <>
          {/* Podium */}
          <Row
            gutter={16}
            align="bottom"
            justify="center"
            style={{ marginBottom: 24 }}
          >
            {podiumOrder.map((idx, colIdx) => {
              const p = top3[idx];
              if (!p) return <Col key={colIdx} xs={24} sm={8} />;
              const place = idx + 1; // 1..3 according to rank
              const height = heights[colIdx];

              return (
                <Col key={p.name} xs={24} sm={8}>
                  <Card
                    className="text-center p-4 w-full"
                    style={{
                      height,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <Tooltip
                        title={
                          place === 1
                            ? "1º lugar"
                            : place === 2
                            ? "2º lugar"
                            : "3º lugar"
                        }
                      >
                        <CrownFilled
                          style={{
                            fontSize: 28,
                            color: crownColors[place - 1],
                          }}
                        />
                      </Tooltip>
                    </div>

                    <Avatar
                      size={50}
                      style={{
                        background: "#f0f2f5",
                        color: "#555",
                        marginTop: 8,
                      }}
                    >
                      {initials(p.name)}
                    </Avatar>

                    <div style={{ marginTop: 8 }}>
                      <Title level={5} style={{ margin: 0 }}>
                        {p.name}
                      </Title>
                      <Tag
                        color={companyColor(p.empresa)}
                      >
                        {p.empresa}
                      </Tag>
                    </div>

                    <div style={{ marginTop: 12 }}>
                      <Statistic value={p.points} title="Pontos" />
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>

          {/* Positions 4 and 5 */}
          {next2.length > 0 && (
            <Card size="small" title="Posições 4–5">
              <List
                itemLayout="horizontal"
                dataSource={next2}
                renderItem={(p, i) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar>{initials(p.name)}</Avatar>}
                      title={
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <Text strong>{`${i + 4}º · ${p.name}`}</Text>
                          <Tag color={companyColor(p.empresa)}>{p.empresa}</Tag>
                        </div>
                      }
                      description={
                        <Text type="secondary">Pontos: {p.points}</Text>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          )}
        </>
      )}
    </Card>
  );
};

export default Podium;
