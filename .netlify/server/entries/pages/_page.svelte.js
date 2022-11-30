import { c as create_ssr_component, d as add_attribute, i as is_promise, n as noop, f as each, e as escape } from "../../chunks/index.js";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://ffznvnwjpahbuhjamklb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmem52bndqcGFoYnVoamFta2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkxMzU4NjAsImV4cCI6MTk4NDcxMTg2MH0.0cRLl8jWCmOJz_1LkocJig_N8wmIUua09c4QJEWvl3g"
);
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let countryname;
  async function getData(countryname2) {
    const { data, error } = await supabase.from("patscen").select().ilike("Country", "%" + countryname2 + "%");
    if (error)
      throw new Error(error.message);
    return data;
  }
  return `<h1>Kuck mal Arne, alle Daten mit Svelte aus Supabase (Postgres) gezogen. Yay.</h1>
<form><input type="${"text"}"${add_attribute("value", countryname, 0)}><input type="${"submit"}"></form>

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
  <p>Fetching data...</p>
`;
    }
    return function(data) {
      return `
  ${each(data, (Pats) => {
        return `<li>${escape(Pats.Country)} - ${escape(Pats.Filing_Fee)}${escape(Pats.Currency)}</li>`;
      })}
`;
    }(__value);
  }(getData(countryname))}`;
});
export {
  Page as default
};
