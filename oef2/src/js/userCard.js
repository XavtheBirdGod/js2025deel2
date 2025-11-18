export function userCard(user) {
    return `
<li class="list-group-item d-flex justify-content-between">
    <span>${user.getLabel()}</span>
    <span class="badge bg-primary">User</span>
</li>`;
}
