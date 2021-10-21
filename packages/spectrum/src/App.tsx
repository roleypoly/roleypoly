import { Router } from '@reach/router';
import { BaseProvider, createDarkTheme } from 'baseui';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { Picker } from './pages/Picker';

const engine = new Styletron();
const theme = createDarkTheme({ primaryFontFamily: 'source-han-sans-japanese' });

function App() {
  return (
    <>
      <StyletronProvider value={engine}>
        <BaseProvider theme={theme}>
          <Router>
            <Picker path="/s/:serverID" />
          </Router>
        </BaseProvider>
      </StyletronProvider>
    </>
  );
}

export default App;
