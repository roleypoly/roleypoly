import Head from 'react-helmet';

export const Title = (props: { title: string }) => (
  <Head>
    <title>{props.title}</title>
  </Head>
);
