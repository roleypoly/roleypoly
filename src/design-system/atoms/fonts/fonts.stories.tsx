import * as React from 'react';
import { UseFontStyled } from './fonts';
import styled from 'styled-components';
import {
    MediumTitle,
    Text as TextBlock,
} from 'roleypoly/src/design-system/atoms/typography';

const resetFont = (storyFn: () => React.ReactNode) => <FontReset>{storyFn()}</FontReset>;

export default {
    title: 'Atoms/Fonts',
    decorators: [resetFont],
};

const FontReset = styled.div`
    font-family: sans-serif;
`;

const CorrectlyFontedH2 = (props: { children: React.ReactNode }) => (
    <UseFontStyled>
        <MediumTitle>{props.children}</MediumTitle>
    </UseFontStyled>
);

const Text = () => (
    <>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et facilis alias
            placeat cumque sapiente ad delectus omnis quae. Reiciendis quibusdam deserunt
            repellat. Exercitationem modi incidunt autem nemo tempore eaque soluta.
        </p>
        <p>
            帯カノ需混モイ一録43旧百12共ドレ能生ホクユ禁度ヨ材図クほはそ護関ラト郵張エノヨ議件クめざ県読れみとぶ論税クょンど慎転リつぎみ松期ほへド.
            縦投記ふで覧速っだせあ過先課フ演無ぎぱべ習併相ーす気6元ゆる領気希ぎ投代ラ我関レ森郎由系堂ず.
            読ケリ夜指ーっトせ認平引ウシ間花ヱクム年6台ぐ山婦ラスエ子著コア掲中ロ像属戸メソユ職諏ルど詐児題たに書希ク幕値長ラそめド.
        </p>
        <p>
            🔸🐕🔺💱🎊👽🐛 👨📼🕦📞 👱👆🍗👚🌈 🔝🔟🍉🔰🍲🏁🕗 🎡🐉🍲📻🔢🔄 💟💲🍻💜💩🔼
            🎱🌸📛👫🌻 🗽🕜🐥👕🍈. 🐒🍚🔓📱🏦 🎦🌑🔛💙👣🔚 🔆🗻🌿🎳📲🍯 🌞💟🎌🍌 🔪📯🐎💮
            👌👭🎋🏉🏰 📓🕃🎂💉🔩 🐟🌇👺🌊🌒 📪👅🍂🍁 🌖🐮🔽🌒📊. 🔤🍍🌸📷🎴 💏🍌📎👥👉👒
            👝💜🔶🍣 💨🗼👈💉💉💰 🍐🕖🌰👝🕓🏊🐕 🏀📅📼📒 🐕🌈👋
        </p>
    </>
);

export const Fonts = () => (
    <TextBlock>
        <section>
            <CorrectlyFontedH2>Unstyled Default</CorrectlyFontedH2>
            <Text />
        </section>
        <section>
            <CorrectlyFontedH2>
                Main (Source Han Sans Japanese, Source Sans)
            </CorrectlyFontedH2>
            <UseFontStyled>
                <Text />
            </UseFontStyled>
        </section>
    </TextBlock>
);
