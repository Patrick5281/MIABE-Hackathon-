/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			white: "#ffffff",
			blue: "#1D4ED8",
			green: "#012f1f",
			pink: "#900",
			primary: {
				200: "#efeffc",
				300: "#cfd0f6",
				400: "#7f81e8",
				DEFAULT: "#1d8200",
				600: "#5658CB",
			},
			secondary: {
				200: "#eaf8f4",
				300: "#bfe9de",
				400: "#56c4a7",
				DEFAULT: "#01f308",
				600: "#26a482",
			},
			gray: {
				50: "#f9fafb",
				100: "#f3f4f6",
				200: "#e5e7eb",
				300: "#d1d5db",
				400: "#9ca3af",
				500: "#6b7280",
				600: "#4b5563",
				700: "#374151",
				800: "#1f2937",
				900: "#111827",
				DEFAULT: "#1D1D1D",
			},
			alert: {
				danger: "#FF4E4E",
				success: "#90DA1",
				warning: "#FEB72F",
			},
		},
		fontSize: {
			"8xl": [
				"120px",
				{
					lineHeight: "120px",
					letterSpacing: "-6px",
					fontWeight: "500",
				},
			],
			"7xl": [
				"72px",
				{
					lineHeight: "80px",
					letterSpacing: "-4.5px",
					fontWeight: "600",
				},
			],
			"6xl": [
				"55px",
				{
					lineHeight: "60px",
					letterSpacing: "-2.5px",
					fontWeight: "500",
				},
			],
			"5xl": [
				"48px",
				{
					lineHeight: "54px",
					letterSpacing: "-1.600000023841858px",
					fontWeight: "500",
				},
			],
			"4xl": [
				"36px",
				{
					lineHeight: "44px",
					letterSpacing: "-1.2000000476837158px",
					fontWeight: "500",
				},
			],
			"3xl": [
				"28px",
				{
					lineHeight: "34px",
					letterSpacing: "-0.800000011920929px",
					fontWeight: "500",
				},
			],
			"2xl": [
				"24px",
				{
					lineHeight: "30px",
					letterSpacing: "-1px",
					fontWeight: "400",
				},
			],
			xl: [
				"24px",
				{
					lineHeight: "30px",
					letterSpacing: "-1px",
					fontWeight: "400",
				},
			],
			lg: [
				"21px",
				{
					lineHeight: "30px",
					letterSpacing: "-0.800000011920929px",
					fontWeight: "400",
				},
			],
			base: [
				"17px",
				{
					lineHeight: "25px",
					letterSpacing: "-0.699999988079071px",
					fontWeight: "400",
				},
			],
			sm: [
				"15px",
				{
					lineHeight: "23px",
					letterSpacing: "-0.6000000238418579px",
					fontWeight: "400",
				},
			],
			caption1: [
				"20px",
				{
					lineHeight: "24px",
					letterSpacing: "-0.6000000238418579px",
					fontWeight: "400",
				},
			],
			caption2: [
				"18px",
				{
					lineHeight: "20px",
					letterSpacing: "-0.30000001192092896px",
					fontWeight: "400",
				},
			],
			caption3: [
				"16px",
				{
					lineHeight: "18px",
					letterSpacing: "-0.5px",
					fontWeight: "400",
				},
			],
			caption4: [
				"13px",
				{
					lineHeight: "15px",
					letterSpacing: "-0.20000000298023224px",
					fontWeight: "400",
				},
			],
		},
		borderRadius: {
			DEFAULT: "10px",
			full: "9999px",
		},
		
		extend: {},
	},
	plugins: [],
};
