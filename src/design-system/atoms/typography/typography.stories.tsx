import * as React from 'react';
import * as typography from './typography';
import styled from 'styled-components';

export default {
    title: 'Atoms/Typography',
};

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

const swatches: [string, string | undefined, string][] = [
    ['text900', 'LargeTitle', 'Used for large titles.'],
    ['text800', 'MediumTitle', 'Used for medium titles.'],
    ['text700', 'SmallTitle', 'Used for small titles.'],
    ['text600', 'AccentTitle', 'Used for accenting titles.'],
    ['text500', 'LargeText', 'Used for general large font text blocks.'],
    ['text400', 'Text', 'Used for less important font text blocks.'],
    ['text300', undefined, 'Used for smaller UI elements.'],
    ['text200', 'AmbientLarge', 'Used for ambient text.'],
    ['text100', 'AmbientSmall', 'Used for ambient text.'],
];

const Section = styled.section`
    margin: 3.26rem;
`;

const swatch = (mixin: typeof typography.text900) =>
    styled.p`
        ${mixin}
    `;

const Usage = styled.code`
    ${typography.text300}
`;

const Description = styled.i`
    ${typography.text200}
`;

export const Sizes = () => (
    <div>
        {swatches.map(([mixin, componentName, usage], i) => {
            const Component = swatch((typography as any)[mixin]);
            return (
                <Section key={i}>
                    <div>
                        <Component>
                            The quick brown fox jumped over the lazy dog.
                        </Component>
                    </div>
                    <div>
                        <Usage>
                            <code>
                                @{mixin} {componentName && `<${componentName} />`}
                            </code>
                        </Usage>
                    </div>
                    <div>
                        <Description>{usage}</Description>
                    </div>
                </Section>
            );
        })}
    </div>
);

const SpacingHead = styled.p`
    ${typography.text700}
`;

const SpacingSection = styled(Section)`
    max-width: 50vw;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
`;

export const Spacing = () => (
    <div>
        {swatches.map(([mixin], i) => {
            const Component = swatch((typography as any)[mixin]);
            return (
                <SpacingSection key={i}>
                    <SpacingHead>@{mixin}</SpacingHead>
                    <Component>
                        <Text />
                    </Component>
                </SpacingSection>
            );
        })}
    </div>
);
