import { Description, Title } from "~/components/SEO";
import Subject from "~/components/Subject";

export default function Scoreboarder() {
	return (
		<>
			<Title>Scoreboarder - Faaast Penguin</Title>
			<Description>Graphical scoreboard generator for competitive Faaast Penguin</Description>
			<div class="bg-zr-500/20 border-zr-700 max-w-2xl p-6 mx-auto flex border rounded-md">
				<Subject name="FP Scoreboarder" version="pre-1.0" />
			</div>
		</>
	);
}
