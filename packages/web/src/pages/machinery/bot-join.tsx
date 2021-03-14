import { navigate } from '@reach/router';
import { Button } from '@roleypoly/design-system/atoms/button';
import { Hero } from '@roleypoly/design-system/atoms/hero';
import { Space } from '@roleypoly/design-system/atoms/space';
import { Link } from '@roleypoly/design-system/atoms/typography';
import { GoArrowLeft } from 'react-icons/go';

const BotJoin = () => (
  <Hero>
    <div>
      Hey. Thanks for taking an interest in Roleypoly.
      <br />
      Right now, we're not allowing you to add the Roleypoly Next closed beta bot to any
      servers.
      <br />
      Please keep an eye on{' '}
      <Link href={'https://discord.com/channels/386659935687147521/790741820173844530'}>
        #next-testers
      </Link>{' '}
      for when we're ready.
      <Space />
      <Button
        onClick={() => {
          navigate(-1);
        }}
        color="muted"
        size="small"
        icon={<GoArrowLeft />}
      >
        Go back
      </Button>
    </div>
  </Hero>
);

export default BotJoin;
