import { HasChildren, QueryClient, QueryClientProvider } from "@granity/helpers";
import { ThemeProvider, Toaster } from "@granity/ui";
import { store } from "@granity-engine/App/Core/_actions/_data/state/store";
import ProvidersBuilder from "@granity-engine/App/Core/Components/ProvidersBuilder";
import HistoryDictionaryContextProvider from "@granity-engine/App/Editor/_actions/_data/providers/HistoryContextProvider";
import CamerasContextProvider from "@granity-engine/App/Scenes/_actions/_data/providers/CamerasContextProvider";
import WidgetsModulesContextProvider from "@granity-engine/App/Widgets/_actions/_data/providers/WidgetsModulesProvider";
import WidgetsContextProvider from "@granity-engine/App/Widgets/_actions/_data/providers/WidgetsProvider";
import { injectStore } from "@granity-engine/App/Widgets/_actions/utilities/createWidget";
import theme from "@granity-engine/Themes/theme";
import { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { CoreContextProvider } from "./App/Core/_actions/_data/providers";
import { EngineOptions } from "./App/Core/_actions/coreTypes";
import useInitCore from "./App/Core/_actions/hooks/useInitCore";

type Props = HasChildren & {
    engine: EngineOptions;
};

injectStore(store);

const queryClient = new QueryClient();

const AppProvider: FC<Props> = ({ engine, children }) => {
    const Providers = ProvidersBuilder([
        [ThemeProvider, { theme }],
        [ReduxProvider, { store }],
        [QueryClientProvider, { client: queryClient }],
        [CoreContextProvider],
        [CamerasContextProvider],
        [WidgetsContextProvider],
        [WidgetsModulesContextProvider],
        [HistoryDictionaryContextProvider],
    ]);

    return (
        <Providers>
            <Toaster.ToastContainer />
            <Initializer engine={engine}>{children}</Initializer>
        </Providers>
    );
};

type InitializerProps = {
    engine: EngineOptions;
    children: React.ReactNode;
};

// Need this component to init the data within the context
const Initializer: FC<InitializerProps> = ({ engine, children }) => {
    useInitCore(engine);

    return <>{children}</>;
};

export default AppProvider;
