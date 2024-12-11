// AuthState - trạng thái liên quan đến đăng nhập và đăng ký
export interface AuthState {
    isAuthenticated: boolean;  // Kiểm tra xem người dùng có đang đăng nhập không
    token: string;             // Lưu token của người dùng (JWT hoặc token khác)
    user: User | null;         // Thông tin người dùng (null nếu chưa đăng nhập)
    isLoading: boolean;        // Trạng thái loading khi thực hiện đăng nhập
    error: string | null;      // Lỗi nếu có khi đăng nhập
    dcID?: number;              // ID của Data Center
  }
  
  // User - thông tin cơ bản của người dùng
  export interface User {
    id: string;
    username: string;
    email: string;
    avatarUrl?: string;        // URL avatar người dùng (tùy chọn)
    // Có thể thêm các thuộc tính khác nếu cần
  }
  
  // GlobalState - trạng thái toàn cục của ứng dụng
  export interface GlobalState {
    isInited: boolean;               // Ứng dụng đã được khởi tạo chưa
    passcode: object;                 // Dữ liệu liên quan đến passcode, có thể thêm chi tiết sau
    isAppUpdateAvailable: boolean;    // Có bản cập nhật ứng dụng không
    shouldShowContextMenuHint: boolean; // Có hiển thị gợi ý menu ngữ cảnh không
    settings: Settings;               // Cài đặt của người dùng
    serviceNotifications: any[];      // Các thông báo dịch vụ
    trustedBotIds: string[];         // Danh sách ID các bot đáng tin cậy
    authState: Record<string, AuthState>; // Thêm quản lý authState cho nhiều người dùng (nếu cần)
  }
  
  // Settings - cài đặt của người dùng
  export interface Settings {
    byKey: {
      theme: 'light' | 'dark';  // Chủ đề ứng dụng (light hoặc dark)
      language: string;         // Ngôn ngữ của người dùng (ví dụ: 'en', 'vi')
      timeFormat: '12h' | '24h'; // Định dạng thời gian
    };
    performance: any;  // Cài đặt hiệu suất (có thể chi tiết hóa theo nhu cầu)
    privacy: any;      // Cài đặt bảo mật (có thể chi tiết hóa theo nhu cầu)
  }
  