export default async function renderDrones() {
    return `<h1>Drones</h1>
<table class="table text-center align-middle">
<thead>
<tr>
<td>ID</td>
<td>UUID</td>
<td>Status</td>
<td>Station ID</td>
</tr>
</thead>
<tbody id="dronesTableBody"></tbody>
</table>`
}