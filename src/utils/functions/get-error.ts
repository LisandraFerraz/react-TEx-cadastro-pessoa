export function errorMsg(error: any) {
  return error.response.data["message"][0];
}
