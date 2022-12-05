<script lang="ts">
import Nav from '../../components/nav.svelte';
// export let supa
// console.log(supa)

// const values = Object.values(supa);


	// HTTP response data provided by +page.ts
	import type { PageData } from './$types';
	export let data: PageData;
    const sourceData = Object.values(data)
	let httpPosts = Object.values(data);

	import { writable, type Writable } from 'svelte/store';

	import DocsShell from '$docs/DocsShell/DocsShell.svelte';
	import { DocsFeature, type DocsShellSettings } from '$docs/DocsShell/types';

	// Components
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import Paginator from '$lib/components/Paginator/Paginator.svelte';
	// Utilities
	import {
		type DataTableModel,
		dataTableHandler,
		dataTableSelect,
		dataTableSelectAll,
		dataTableSort,
		tableInteraction,
		tableA11y
	} from '$lib/utilities/DataTable/DataTable';
	import CodeBlock from '$lib/utilities/CodeBlock/CodeBlock.svelte';

	
	// Store
	const dataTableModel: Writable<DataTableModel> = writable({
		source: httpPosts,
		filtered: httpPosts,
		selection: [],
		search: '',
		sort: '',
		pagination: { offset: 0, limit: 5, size: 0, amounts: [1, 2, 5, 10] }
	});
	dataTableModel.subscribe((v) => dataTableHandler(v));

	// Manual Selection
	dataTableSelect(dataTableModel, 'id', [1]);
</script>
<Nav>
</Nav>
<div class="card-header">
    <input bind:value={$dataTableModel.search} type="search" placeholder="Search Table..." />
</div>
<!-- Table -->
<div class="card-body">
    <div class="table-container">
        <!-- prettier-ignore -->
        <table class="table table-hover" role="grid" use:tableInteraction use:tableA11y>
            <thead on:click={(e) => { dataTableSort(e, dataTableModel) }} on:keypress>
                <tr>
                    
                    <th data-sort="Country">Country</th>
                    <th>Year 1</th>
                    <th>Year 2</th>
                    <th>Year 3</th>
                    <th>Year 4</th>
                    <th>Year 5</th>
                    <th>Year 6</th>
                    <th>Year 7</th>
                    <th>Sum</th>
                    
                </tr>
            </thead>
            <tbody>
                {#each $dataTableModel.filtered as row, rowIndex}
                    <tr class:table-row-checked={row.dataTableChecked} aria-rowindex={rowIndex + 1}>
                        <td role="gridcell" aria-colindex={2} tabindex="0">
                            <em class="opacity-50">{row.Country}</em>
                        </td>
                        <td role="gridcell" aria-colindex={3} tabindex="0">
                            {row.year_1}&nbsp;{row.Currency}
                        </td>
                        <td role="gridcell" aria-colindex={4} tabindex="0" class="md:!whitespace-normal capitalize">
                            {row.year_2}&nbsp;{row.Currency}
                        </td>
                        <td role="gridcell" aria-colindex={4} tabindex="0" class="md:!whitespace-normal capitalize">
                            {row.year_3}&nbsp;{row.Currency}
                        </td>
                        <td role="gridcell" aria-colindex={4} tabindex="0" class="md:!whitespace-normal capitalize">
                            {row.year_4}&nbsp;{row.Currency}
                        </td>
                        <td role="gridcell" aria-colindex={4} tabindex="0" class="md:!whitespace-normal capitalize">
                            {row.year_5}&nbsp;{row.Currency}
                        </td>
                        <td role="gridcell" aria-colindex={4} tabindex="0" class="md:!whitespace-normal capitalize">
                            {row.year_6}&nbsp;{row.Currency}
                        </td>
                        <td role="gridcell" aria-colindex={4} tabindex="0" class="md:!whitespace-normal capitalize">
                            {row.year_7}&nbsp;{row.Currency}
                        </td>
                        <td role="gridcell" aria-colindex={4} tabindex="0" class="md:!whitespace-normal capitalize">
                            {parseFloat(row.year_7? row.year_7 : 0)
                            +parseFloat(row.year_6? row.year_6 : 0)
                            +parseFloat(row.year_5? row.year_5 : 0)
                            +parseFloat(row.year_4? row.year_4 : 0)
                            +parseFloat(row.year_3? row.year_3 : 0)
                            +parseFloat(row.year_2? row.year_2 : 0)
                            +parseFloat(row.year_1? row.year_1 : 0)}&nbsp;{row.Currency}
                        </td>
                        
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
<div class="card-footer">
    <Paginator bind:settings={$dataTableModel.pagination} />
</div>