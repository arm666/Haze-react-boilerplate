import { CookiesProvider } from 'react-cookie';
import DevTool from './src/layouts/DevToolUI';
import DevToolProvider from './src/providers/DevToolProvider';

const DevToolSetup = () => {
  if (!process.env.REACT_APP_DEV_TOOLS) return null;
  return (
    <CookiesProvider>
      <DevToolProvider>
        <DevTool />
      </DevToolProvider>
    </CookiesProvider>
  );
};

export default DevToolSetup;
