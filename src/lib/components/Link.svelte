<script lang="ts">
	/*
		TODO:
		- [ ] Show path progressively show / animated in on load.  Also fix sliding in from left side (at last in from bottom)
    - [ ] Support link types
      - [ ] https://airbnb.io/visx/linktypes
        - [ ] https://github.com/airbnb/visx/tree/master/packages/visx-shape/src/shapes/link
      - [ ] https://observablehq.com/@nitaku/corner-connectors
      - [ ] Straight
      - [ ] Square
      - [ ] Beveled
      - [ ] Rounded
    - [ ] Investigate: https://observablehq.com/@fil/sankey-link-paths
    - [ ] Use for annotations - https://github.com/techniq/layerchart/issues/11
	*/
	import type { tweened as tweenedStore } from 'svelte/motion';
	import { link as d3Link, curveBumpX, curveBumpY } from 'd3-shape';
	import { interpolatePath } from 'd3-interpolate-path';

	import { motionStore } from '$lib/stores/motionStore';

	// Properties to override what is used from context
	export let data: any = undefined; // TODO: Update Type
	export let orientation: 'vertical' | 'horizontal' = 'horizontal';
	/**
	 * Update source and target accessors to be compatibke with d3-sankey.  see: https://github.com/d3/d3-sankey#sankeyLinkHorizontal
	 */
	export let sankey = false;
	export let source = sankey ? (d) => [d.source.x1, d.y0] : (d) => d.source;
	export let target = sankey ? (d) => [d.target.x0, d.y1] : (d) => d.target;
	export let x = sankey ? (d) => d[0] : (d) => (orientation === 'horizontal' ? d.y : d.x);
	export let y = sankey ? (d) => d[1] : (d) => (orientation === 'horizontal' ? d.x : d.y);
	export let curve = orientation === 'horizontal' ? curveBumpX : curveBumpY;
	export let tweened: boolean | Parameters<typeof tweenedStore>[1] = undefined;

	export let color = 'black';
	export let width = undefined;

	$: tweenedOptions = tweened ? { interpolate: interpolatePath, ...tweened } : false;
	$: tweened_d = motionStore('', { tweened: tweenedOptions });
	$: {
		orientation; // subscribe to orientation changes to link is update
		const link = d3Link(curve).source(source).target(target).x(x).y(y);
		const d = link(data);
		tweened_d.set(d);
	}
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<path
	class="path-link"
	d={$tweened_d}
	stroke={color}
	stroke-width={width}
	fill="none"
	on:click
	on:mouseover
	on:mouseout
	{...$$restProps}
/>
