<script lang="ts">
	import { getContext } from 'svelte';

	import Circle from './Circle.svelte';
	import { isScaleBand } from '../utils/scales';
	import type { ScaleBand } from 'd3-scale';

	const context = getContext('LayerCake') as any;
	const { data, xGet, y, yGet, xScale, yScale, rGet, config } = context;

	type Offset = number | ((value: number, context: any) => number);

	export let r = 5;
	export let offsetX: Offset = undefined;
	export let offsetY: Offset = undefined;
	export let color: string | ((obj: { value: any; item: any; index: number }) => string) =
		'var(--color-blue-500)';

	function getOffset(value, offset: Offset, scale: any) {
		if (typeof offset === 'function') {
			return offset(value, context);
		} else if (offset != null) {
			return offset;
		} else if (isScaleBand(scale)) {
			return scale.bandwidth() / 2;
		} else {
			return 0;
		}
	}

	function getColor(item: any, index: number) {
		if (typeof color === 'function') {
			return color({ value: $y(item), item, index });
		} else if ($config.r) {
			// console.log({ item, value: $rGet(item), scale: $rGet.domain() });
			return $rGet(item);
		} else {
			return color;
		}
	}

	$: points = $data.flatMap((d) => {
		if (Array.isArray($config.x)) {
			/*
				x={["prop1" ,"prop2"]}
				y="prop3"
			*/
			return $xGet(d).map((x) => {
				return {
					x: x + getOffset(x, offsetX, $xScale),
					y: $yGet(d) + getOffset($yGet(d), offsetY, $yScale),
					data: d
				};
			});
		} else if (Array.isArray($config.y)) {
			/*
				x="prop1"
				y={["prop2" ,"prop3"]}
			*/
			return $yGet(d).map((y) => {
				return {
					x: $xGet(d) + getOffset($xGet(d), offsetX, $xScale),
					y: y + getOffset(y, offsetY, $yScale),
					data: d
				};
			});
		} else {
			/*
				x="prop1"
				y="prop2"
			*/
			return {
				x: $xGet(d) + getOffset($xGet(d), offsetX, $xScale),
				y: $yGet(d) + getOffset($yGet(d), offsetY, $yScale),
				data: d
			};
		}
	});
</script>

<slot {points}>
	<g class="point-group">
		{#each points as point, index}
			<Circle cx={point.x} cy={point.y} {r} fill={getColor(point.data, index)} {...$$restProps} />
		{/each}
	</g>
</slot>
