import type { AuthState } from '../global/types';
import { DEBUG, SESSION_USER_KEY } from '../config';

// Kiểm tra xem người dùng đã đăng nhập hay chưa (kiểm tra nếu session có tồn tại)
export function hasStoredSession(): boolean {
  if (checkSessionLocked()) {
    return true;
  }

  const userAuthJson = localStorage.getItem(SESSION_USER_KEY);
  if (!userAuthJson) {
    return false;
  }

  try {
    const userAuth = JSON.parse(userAuthJson);
    return Boolean(userAuth && userAuth.id && userAuth.token); // Kiểm tra xem có token và user không
  } catch (err) {
    // Nếu có lỗi khi parse dữ liệu
    return false;
  }
}

// Lưu thông tin session vào localStorage
export function storeSession(sessionData: AuthState, currentUserId?: string): void {
  const { dcID, token, user } = sessionData;

  // Lưu thông tin người dùng, token và dcID vào localStorage
  localStorage.setItem(SESSION_USER_KEY, JSON.stringify({
    dcID,          // Lưu dcID (nếu cần)
    id: currentUserId,
    token,         // Lưu token
    user,          // Lưu thông tin người dùng
  }));

  localStorage.setItem('dc', String(dcID)); // Lưu dcID vào localStorage (có thể là 1 cho máy chủ chính)
}

// Xóa session đã lưu trữ
export function clearStoredSession(): void {
  // Xóa tất cả thông tin liên quan đến phiên đăng nhập
  [
    SESSION_USER_KEY,
    'dc',   // Xóa thông tin máy chủ
  ].forEach((key) => {
    localStorage.removeItem(key);
  });
}

// Tải session đã lưu trữ từ localStorage
export function loadStoredSession(): AuthState | undefined {
  if (!hasStoredSession()) {
    return undefined;
  }

  const userAuth = JSON.parse(localStorage.getItem(SESSION_USER_KEY)!);
  if (!userAuth) {
    return undefined;
  }

  const dcID = Number(userAuth.dcID);
  const token = userAuth.token;
  const user = userAuth.user;

  return {
    dcID,
    token,
    user,
    isAuthenticated: true,
    isLoading: false,
    error: null,
  };
}

// Nhập session thử nghiệm (nếu có)
export function importTestSession(): void {
  const sessionJson = process.env.TEST_SESSION!;
  try {
    const sessionData = JSON.parse(sessionJson) as AuthState;
    storeSession(sessionData, sessionData.user?.id);
  } catch (err) {
    if (DEBUG) {
      console.warn('Failed to load test session', err);
    }
  }
}

// Kiểm tra xem session có bị khóa hay không (ví dụ: nếu màn hình bị khóa)
function checkSessionLocked(): boolean {
  return localStorage.getItem('isScreenLocked') === 'true';
}
