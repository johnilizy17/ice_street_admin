import "../styles/globals.css";
import {
	ChakraProvider,
	ColorModeProvider,
	createStandaloneToast,
} from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import theme from "../theme";
import { Provider } from "react-redux";
import { store } from "../app/store";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import Script from 'next/script';
import "../styles/globals.css";
import Link from "next/link";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
axios.defaults.baseURL = process.env.API_URL;

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-KZPWPNJ6MD`} />
			<Script strategy="lazyOnload">
				{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-KZPWPNJ6MD', {
                    page_path: window.location.pathname,
                    });
                `}
			</Script>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<ChakraProvider resetCSS theme={theme}>
						<ColorModeProvider
							options={{ useSystemColorMode: false, initialColorMode: "light" }}
						>
							<Component {...pageProps} />
						</ColorModeProvider>
					</ChakraProvider>
				</Provider>
			</QueryClientProvider>
		</>
	);
}

export default MyApp;