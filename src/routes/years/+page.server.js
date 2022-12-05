import supabase from '$lib/db'
// import { get } from 'svelte/store';
let countryname

export const load = async function getData() {

  const { data, error } = await supabase
    .from('patscen')
    .select()
  if (error) throw new Error(error.message)
  // console.log(data)
  return data
    }