import supabase from '$lib/db'
// import { get } from 'svelte/store';
let countryname

export const load = async function getData() {

  const { data, error } = await supabase
    .from('patscen')
    .select("Country, Filing_Fee")
    .limit(4)
  if (error) throw new Error(error.message)
  
  return data
    }