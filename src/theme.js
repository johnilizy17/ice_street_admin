import { extendTheme } from "@chakra-ui/react";

const fonts = { mono: `'Menlo', monospace` };

const theme = extendTheme({
	colors: {
		purple: {
			100: "#EBECFE",
			200: "#BFBEFC",
			300: "#A996FF",
			400: "#9875FF",
			500: "#414272",
			600: "#610BEF",
			700: "#4700AB",
			800: "#2E036A",
		},
		pink: {
			100: "#FFECFC",
			200: "#FFABE8",
			300: "#FF75CB",
			400: "#FF54AF",
			500: "#FF4268",
			600: "#CA024F",
			700: "#9E0038",
			800: "#5B001E",
		},
		black: "#16161D",
	},
	fonts,
});

export default theme;
