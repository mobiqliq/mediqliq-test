export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function hasRole(allowedRoles = []) {
  const user = getCurrentUser();
  if (!user) return false;
  return allowedRoles.includes(user.role);
}
