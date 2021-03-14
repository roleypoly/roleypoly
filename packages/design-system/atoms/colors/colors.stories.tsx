import { AmbientSmall } from '@roleypoly/design-system/atoms/typography';
import chroma from 'chroma-js';
import * as React from 'react';
import styled from 'styled-components';
import { palette } from './colors';

type RatioList = {
  color1: string[];
  color2: string[];
  ratio: string;
};

export default {
  title: 'Atoms/Colors',
};

const Swatch = styled.div`
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  width: 250px;
  height: 100px;
  margin: 10px;
  display: inline-block;
  background-color: #fff;
  border: 1px solid #fff;
`;

const SwatchColor = styled.div`
  height: 72px;
`;

const Label = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding: 6px;
  color: ${palette.taupe100};
  p {
    margin: 0;
  }
`;

export const Colors = () => {
  return (
    <div>
      {Object.entries(palette).map(([name, color], i) => (
        <Swatch key={i}>
          <SwatchColor style={{ backgroundColor: color }} />
          <Label>
            <p>{name}</p>
            <p>
              <code>var(--{name})</code>
            </p>
          </Label>
        </Swatch>
      ))}
    </div>
  );
};

export const ContrastRatios = () => {
  const allRatios = getAllRatios(palette);

  return (
    <div>
      <p>
        <b>WCAG Contrast Calculations.</b>
        <br />
        Marked in <span style={getWCAGStyle(7.1)}>Green</span> is 7.0+ or AAA. Acceptable
        for Text.
        <br />
        Marked in <span style={getWCAGStyle(4.6)}>Orange</span> is 4.5+ or AA. Acceptable
        for UI.
        <br />
        All below 4.5 is unacceptable.
        <br />
        <AmbientSmall>WCAG Contrast testing disabled for this page.</AmbientSmall>
      </p>
      <ContrastTable>
        <thead>
          <tr>
            <th colSpan={2}>Swatch</th>
            <th>Ratio</th>
            <th>Color 1</th>
            <th>Color 2</th>
          </tr>
        </thead>
        <tbody>
          {allRatios.map((ratio, i) => (
            <tr key={i}>
              <td style={{ backgroundColor: ratio.color1[1] }}>&nbsp;</td>
              <td style={{ backgroundColor: ratio.color2[1] }}>&nbsp;</td>
              <td style={getWCAGStyle(+ratio.ratio)}>{ratio.ratio}</td>
              <td>{ratio.color1[0]}</td>
              <td>{ratio.color2[0]}</td>
              <td
                style={{
                  color: ratio.color1[1],
                  backgroundColor: ratio.color2[1],
                  paddingRight: '0.1em',
                }}
              >
                oh my god my
              </td>
              <td
                style={{
                  color: ratio.color2[1],
                  backgroundColor: ratio.color1[1],
                  paddingLeft: '0.1em',
                }}
              >
                shin how dare you
              </td>
            </tr>
          ))}
        </tbody>
      </ContrastTable>
    </div>
  );
};

const ContrastTable = styled.table`
  td,
  th {
    padding: 6px 10px;
  }
`;

const getWCAGStyle = (ratio: number): React.CSSProperties => {
  if (ratio >= 7) {
    return { color: 'green', fontWeight: 'bold' };
  }

  if (ratio >= 4.5) {
    return { color: 'orange', fontWeight: 'bold' };
  }

  return {};
};

const getAllRatios = (input: typeof palette) =>
  Object.entries(input)
    .filter(([name]) => !name.startsWith('discord'))
    .reduce((acc, [name, color]) => {
      return [
        ...acc,
        ...Object.entries(palette)
          .filter(([name]) => !name.startsWith('discord'))
          .map(([matchName, matchColor]) => ({
            color1: [name, color],
            color2: [matchName, matchColor],
            ratio: chroma.contrast(color, matchColor).toFixed(2),
          })),
      ];
    }, [] as RatioList[])
    .filter(({ ratio }) => +ratio !== 1)
    .sort((a, b) => {
      if (+a.ratio > +b.ratio) {
        return -1;
      }
      return 1;
    })
    .filter((_, i) => i % 2 === 0);
