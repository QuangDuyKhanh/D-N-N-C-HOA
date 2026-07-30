<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOCI PERFUME | Quản Trị Đơn Hàng</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              gold: "#D4AF37",
              darkBg: "#0A0A0A",
              darkSurface: "#111111",
              darkCard: "rgba(20, 20, 20, 0.65)",
            },
          },
        },
      };
    </script>
    
    <!-- Chart.js CDN -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Google Fonts & Font Awesome -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    
    <style>
      body {
        font-family: 'Montserrat', sans-serif;
        background-color: #0A0A0A;
      }
      .font-title {
        font-family: 'Cormorant Garamond', serif;
      }
      .glass-card {
        background: rgba(17, 17, 17, 0.7);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: #0a0a0a;
      }
      ::-webkit-scrollbar-thumb {
        background: #D4AF37/20;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #D4AF37/55;
      }
    </style>
  </head>
  <body class="text-gray-100 min-h-screen pb-12">
    <!-- 1. Màn hình Đăng nhập -->
    <?php include 'components/admin/login.html'; ?>

    <!-- 2. Nội dung Dashboard Quản trị -->
    <div id="dashboard-content" class="hidden">
      <!-- Header Admin -->
      <?php include 'components/admin/header.html'; ?>

      <main class="container mx-auto px-4 md:px-8 mt-8">
        <!-- Banner thông báo âm thanh -->
        <div id="audio-consent-banner" class="hidden glass-card border-gold/30 p-4 rounded-xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-circle-info text-gold text-lg"></i>
            <p class="text-xs text-gray-300">Trình duyệt yêu cầu tương tác để bật **âm thanh thông báo** khi có đơn hàng mới.</p>
          </div>
          <button onclick="enableAudio()" class="bg-gold text-black font-bold text-xs px-4 py-2 rounded hover:bg-gold/80 transition-colors whitespace-nowrap">Kích Hoạt Âm Thanh</button>
        </div>

        <!-- Thanh điều hướng Tab chính -->
        <div class="flex border-b border-white/10 mb-8 gap-2">
          <button id="nav-orders-btn" onclick="switchSection('orders')" class="pb-3 px-4 text-xs md:text-sm font-bold tracking-wider border-b-2 border-gold text-white flex items-center gap-2 transition-all">
            <i class="fa-solid fa-cart-shopping"></i> QUẢN LÝ ĐƠN HÀNG
          </button>
          <button id="nav-contacts-btn" onclick="switchSection('contacts')" class="pb-3 px-4 text-xs md:text-sm font-bold tracking-wider border-b-2 border-transparent text-gray-400 hover:text-white flex items-center gap-2 relative transition-all">
            <i class="fa-solid fa-envelope"></i> TIN NHẮN LIÊN HỆ
            <span id="contacts-badge" class="hidden bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-1.5">0</span>
          </button>
          <button id="nav-dashboard-btn" onclick="switchSection('dashboard')" class="pb-3 px-4 text-xs md:text-sm font-bold tracking-wider border-b-2 border-transparent text-gray-400 hover:text-white flex items-center gap-2 transition-all">
            <i class="fa-solid fa-chart-line"></i> THỐNG KÊ DOANH THU
          </button>
        </div>

        <!-- Section 1: Quản Lý Đơn Hàng -->
        <?php include 'components/admin/orders.html'; ?>

        <!-- Section 2: Tin Nhắn Liên Hệ -->
        <?php include 'components/admin/contacts.html'; ?>

        <!-- Section 3: Thống Kê Doanh Thu -->
        <?php include 'components/admin/dashboard.html'; ?>
      </main>
    </div>

    <!-- Modal Edit Order -->
    <?php include 'components/admin/edit-modal.html'; ?>

    <!-- Toast Container -->
    <div id="toast-container" class="fixed bottom-6 right-6 z-50 space-y-3 pointer-events-none"></div>

    <!-- Modules JavaScript Tách Riêng -->
    <script src="assets/js/admin/admin-core.js"></script>
    <script src="assets/js/admin/admin-orders.js"></script>
    <script src="assets/js/admin/admin-contacts.js"></script>
    <script src="assets/js/admin/admin-dashboard.js"></script>
  </body>
</html>
