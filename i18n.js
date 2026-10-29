(function () {
  "use strict";

  const STORAGE_KEY = "mangaNexusLanguage";
  const SUPPORTED = ["vi", "en"];
  const detected = String(navigator.language || "").toLowerCase().startsWith("vi") ? "vi" : "en";
  let locale = SUPPORTED.includes(localStorage.getItem(STORAGE_KEY))
    ? localStorage.getItem(STORAGE_KEY)
    : detected;

  const messages = {
    en: {
      "language.label": "Language",
      "language.vi": "Tiếng Việt",
      "language.en": "English",
      "settings.title": "Settings",
      "settings.open": "⚙️ Settings",
      "settings.close": "Close",
      "settings.saving": "Changing language...",
      "settings.failed": "Could not change language. The previous language is still active.",
      "auth.subtitle": "Sign in to load your cloud progress",
      "auth.username": "Username",
      "auth.password": "Password",
      "auth.login": "Login",
      "auth.register": "Register",
      "auth.creating": "Creating account...",
      "auth.signingIn": "Signing in...",
      "auth.usernameInvalid": "Username must be 3–20 lowercase letters, numbers, or underscores.",
      "auth.passwordInvalid": "Password must be at least 8 characters.",
      "content.loading": "Loading game definitions...",
      "content.unavailable": "Game content unavailable",
      "content.unavailableDescription": "Definitions could not be loaded from Nakama.",
      "common.retry": "Retry",
      "common.logout": "Logout",
      "common.close": "Close",
      "common.cancel": "Cancel",
      "common.confirm": "Confirm",
      "cloud.loading": "Loading cloud progress...",
      "cloud.ready": "Cloud ready",
      "cloud.pending": "Changes pending...",
      "cloud.saving": "Saving to cloud...",
      "cloud.saved": "Saved {time}",
      "cloud.offline": "Offline — retrying in {seconds}s",
      "cloud.conflict": "Cloud conflict — reload required",
      "cloud.conflictToast": "This save changed on another tab or device. Reload to protect progress.",
      "quest.title": "Permanent Quest Journey",
      "quest.offline": "Quest service offline. Gameplay and cloud saving are still available.",
      "quest.allComplete": "All available quests completed.",
      "quest.rewardReady": "Reward ready to claim",
      "quest.loading": "Loading quest journey...",
      "quest.unavailable": "Quest progress is temporarily unavailable.",
      "quest.optional": "Optional",
      "quest.reward": "Reward",
      "quest.claim": "Claim reward",
      "quest.claimed": "Quest reward claimed: {rewards}",
      "quest.chapterComplete": "Chapter complete: {chapter}!",
      "reward.gold": "{amount} gold",
      "reward.soul": "{amount} Soul Fragments",
      "reward.iron": "{amount} Iron Bars",
      "reward.character": "Character: {name}",
      "reward.equipment": "Equipment: {name}",
      "reward.title": "Title: {name}",
      "action.equipped": "Equipment selection saved.",
      "action.upgraded": "Upgrade completed and validated by Nakama.",
      "action.unlocked": "Unlocked {name}.",
      "error.generic": "The server request failed.",
      "error.session": "The saved session is invalid. Please sign in again.",
      "error.contentIncomplete": "The server returned incomplete localized game content.",
      "error.savePending": "Cloud progress must finish syncing before this action.",
      "error.invalidCredentials": "The username or password is incorrect.",
      "error.accountExists": "That username is already registered.",
      "quest.servicePrefix": "Quest service",
      "status.locked": "locked",
      "status.active": "active",
      "status.claimable": "claimable",
      "status.claimed": "claimed"
    },
    vi: {
      "language.label": "Ngôn ngữ",
      "language.vi": "Tiếng Việt",
      "language.en": "English",
      "settings.title": "Cài Đặt",
      "settings.open": "⚙️ Cài Đặt",
      "settings.close": "Đóng",
      "settings.saving": "Đang đổi ngôn ngữ...",
      "settings.failed": "Không thể đổi ngôn ngữ. Ngôn ngữ trước đó vẫn được giữ.",
      "auth.subtitle": "Đăng nhập để tải tiến trình đám mây",
      "auth.username": "Tên đăng nhập",
      "auth.password": "Mật khẩu",
      "auth.login": "Đăng Nhập",
      "auth.register": "Đăng Ký",
      "auth.creating": "Đang tạo tài khoản...",
      "auth.signingIn": "Đang đăng nhập...",
      "auth.usernameInvalid": "Tên đăng nhập phải có 3–20 ký tự thường, số hoặc dấu gạch dưới.",
      "auth.passwordInvalid": "Mật khẩu phải có ít nhất 8 ký tự.",
      "content.loading": "Đang tải dữ liệu trò chơi...",
      "content.unavailable": "Không thể tải dữ liệu trò chơi",
      "content.unavailableDescription": "Không thể tải dữ liệu định nghĩa từ Nakama.",
      "common.retry": "Thử Lại",
      "common.logout": "Đăng Xuất",
      "common.close": "Đóng",
      "common.cancel": "Hủy",
      "common.confirm": "Xác Nhận",
      "cloud.loading": "Đang tải tiến trình đám mây...",
      "cloud.ready": "Đám mây sẵn sàng",
      "cloud.pending": "Đang chờ đồng bộ...",
      "cloud.saving": "Đang lưu lên đám mây...",
      "cloud.saved": "Đã lưu {time}",
      "cloud.offline": "Mất kết nối — thử lại sau {seconds} giây",
      "cloud.conflict": "Xung đột dữ liệu — cần tải lại",
      "cloud.conflictToast": "Dữ liệu đã thay đổi trên thiết bị khác. Hãy tải lại để bảo vệ tiến trình.",
      "quest.title": "Hành Trình Nhiệm Vụ Vĩnh Viễn",
      "quest.offline": "Dịch vụ nhiệm vụ đang ngoại tuyến. Bạn vẫn có thể chơi và lưu tiến trình.",
      "quest.allComplete": "Đã hoàn thành mọi nhiệm vụ hiện có.",
      "quest.rewardReady": "Phần thưởng đã sẵn sàng",
      "quest.loading": "Đang tải hành trình nhiệm vụ...",
      "quest.unavailable": "Tiến trình nhiệm vụ tạm thời không khả dụng.",
      "quest.optional": "Tùy chọn",
      "quest.reward": "Phần thưởng",
      "quest.claim": "Nhận thưởng",
      "quest.claimed": "Đã nhận thưởng nhiệm vụ: {rewards}",
      "quest.chapterComplete": "Hoàn thành chương: {chapter}!",
      "reward.gold": "{amount} vàng",
      "reward.soul": "{amount} Mảnh Linh Hồn",
      "reward.iron": "{amount} Thỏi Sắt",
      "reward.character": "Nhân vật: {name}",
      "reward.equipment": "Trang bị: {name}",
      "reward.title": "Danh hiệu: {name}",
      "action.equipped": "Đã lưu lựa chọn trang bị.",
      "action.upgraded": "Cường hóa thành công và đã được Nakama xác thực.",
      "action.unlocked": "Đã mở khóa {name}.",
      "error.generic": "Yêu cầu đến máy chủ thất bại.",
      "error.session": "Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.",
      "error.contentIncomplete": "Máy chủ trả về dữ liệu trò chơi chưa đầy đủ.",
      "error.savePending": "Tiến trình phải đồng bộ xong trước khi thực hiện hành động này.",
      "error.invalidCredentials": "Tên đăng nhập hoặc mật khẩu không đúng.",
      "error.accountExists": "Tên đăng nhập này đã được đăng ký.",
      "quest.servicePrefix": "Dịch vụ nhiệm vụ",
      "status.locked": "đã khóa",
      "status.active": "đang thực hiện",
      "status.claimable": "có thể nhận",
      "status.claimed": "đã nhận"
    }
  };

  const phrasePairs = [
    ["Connecting to account server...", "Đang kết nối máy chủ tài khoản..."],
    ["Instructions", "Hướng Dẫn"], ["Change Log", "Nhật Ký Thay Đổi"], ["About", "Giới Thiệu"],
    ["Player Information", "Thông Tin"], ["Gold:", "Vàng:"], ["Soul Fragments:", "Mảnh Linh Hồn:"],
    ["Iron Bars:", "Thỏi Sắt:"], ["Character", "Nhân Vật"], ["Equipment", "Trang Bị"],
    ["Total Stats", "Tổng Chỉ Số"], ["Actions", "Hành Động"], ["Tower", "Tòa Tháp"],
    ["World Gates", "Cổng Thế Giới"], ["Gallery", "Thư Viện"], ["Quests", "Nhiệm Vụ"],
    ["Settings", "Cài Đặt"], ["Logout", "Đăng Xuất"], ["Close", "Đóng"], ["Cancel", "Hủy"],
    ["Confirm", "Xác Nhận"], ["Previous", "Trước"], ["Next", "Tiếp"], ["Challenge", "Khiêu Chiến"],
    ["Stop", "Dừng"], ["Repeat", "Lần lặp"], ["You", "Bạn"], ["Opponent", "Đối thủ"],
    ["Available floor", "Tầng có thể khiêu chiến"], ["Locked floor", "Tầng chưa mở khóa"],
    ["No character selected.", "Chưa chọn nhân vật."], ["No equipment equipped.", "Chưa trang bị."],
    ["You do not own anything yet.", "Bạn chưa sở hữu gì."], ["Upgrade", "Cường Hóa"],
    ["Maximum level reached!", "Đã đạt cấp tối đa!"], ["Not enough gold!", "Không đủ vàng!"],
    ["Please select a character!", "Vui lòng chọn nhân vật!"],
    ["Not enough gold to enter this dungeon!", "Không đủ vàng để vào dungeon này!"],
    ["Adventure stopped!", "Đã dừng phiêu lưu!"], ["Victory", "Chiến thắng"],
    ["Defeat", "Thất bại"], ["Rewards", "Phần thưởng"], ["Normal attack", "Tấn công thường"],
    ["critical hit", "đòn chí mạng"], ["dodged", "né"], ["damage", "sát thương"],
    ["turn", "lượt"], ["Event", "Sự kiện"], ["Encountered", "Gặp"], ["BOSS", "BOSS"],
    ["Adventure", "Phiêu lưu"], ["completed", "hoàn thành"], ["Click to show/hide", "Click để xem/ẩn"],
    ["Items obtainable from", "Vật phẩm có thể nhận từ"], ["New", "Mới"],
    ["Owned", "Đã sở hữu"], ["Equipped", "Đang trang bị"], ["Level", "Cấp"],
    ["Stats", "Chỉ số"], ["Skills", "Kỹ Năng"], ["Description", "Mô tả"],
    ["Daily Quests", "Nhiệm Vụ Hàng Ngày"], ["Feature under development.", "Tính năng đang được phát triển."]
    ,["Character List", "Danh Sách Nhân Vật"], ["Equipment List", "Danh Sách Trang Bị"],
    ["World List", "Danh Sách Thế Giới"], ["Click the name for details", "Click Vào Tên Để Xem Chi Tiết"],
    ["Changes every day", "Thay Đổi Mỗi Ngày"], ["Choose a floor:", "Chọn tầng khiêu chiến:"],
    ["Current highest floor:", "Tầng hiện tại bạn đã tới:"], ["Floor Guardian", "Thủ hộ tầng"],
    ["No data for floor", "Chưa có dữ liệu tầng"], ["Tower - Floor", "Tòa Tháp - Tầng"],
    ["You unlocked floor", "Bạn đã mở khóa tầng"], ["Victory on floor", "Chiến thắng tầng"],
    ["You were defeated on floor", "Bạn đã bị đánh bại ở tầng"],
    ["You received no rewards.", "Bạn không nhận được phần thưởng nào."],
    ["Starting challenge", "Bạn bắt đầu khiêu chiến"], ["Challenge result", "Kết quả khiêu chiến"],
    ["Reward summary", "Tổng Kết Phần Thưởng"], ["Total attempts", "Tổng số lần"],
    ["Reward for attempt", "Phần thưởng lần"], ["processing", "đang xử lý"],
    ["No items", "Không có vật phẩm"], ["Items received", "Vật phẩm nhận được"],
    ["Character Card", "Thẻ Nhân vật"], ["Equipment Card", "Thẻ Trang bị"],
    ["You won!", "Bạn đã chiến thắng!"], ["You were defeated!", "Bạn đã bị đánh bại!"],
    ["used", "dùng"], ["but", "nhưng"], ["dealt", "gây"], ["Enemy", "Địch"],
    ["increases", "tăng"], ["decreases", "giảm"], ["self", "bản thân"], ["opponent", "đối thủ"],
    ["Sudden Death mode activated", "Chế độ SUDDEN DEATH đã kích hoạt"],
    ["Collection", "Sưu tập"], ["Use", "Dùng"], ["In Use", "Đang Dùng"], ["Max Level", "Cấp Tối Đa"],
    ["Adventure cost", "Phiêu Lưu"], ["World", "Thế Giới"], ["Rarity", "Độ hiếm"],
    ["Potential rewards", "Vật phẩm có thể nhận"], ["Confirm Adventure", "Xác Nhận Phiêu Lưu"],
    ["Party", "Đội hình"], ["Current stats", "Chỉ số hiện tại"], ["Stats after upgrade", "Chỉ số sau C.Hóa"],
    ["Cost", "Chi phí"], ["Not enough", "Không đủ"], ["has been upgraded to", "đã được cường hóa lên"],
    ["Converted", "Đã chuyển hóa"], ["Received a new", "Nhận được"], ["new character", "nhân vật mới"],
    ["new equipment", "trang bị mới"], ["Normal Attack", "Đánh thường"]
  ];

  const sourceText = new WeakMap();
  let observer;

  function validateCatalogs() {
    const english = Object.keys(messages.en).sort();
    const vietnamese = Object.keys(messages.vi).sort();
    if (english.length !== vietnamese.length || english.some((key, index) => key !== vietnamese[index])) {
      throw new Error("The Vietnamese and English locale dictionaries must contain identical keys.");
    }
  }

  function normalize(value) {
    return SUPPORTED.includes(value) ? value : "en";
  }

  function interpolate(template, parameters) {
    return String(template).replace(/\{(\w+)\}/g, (_, key) =>
      parameters && parameters[key] !== undefined ? String(parameters[key]) : `{${key}}`
    );
  }

  function t(key, parameters) {
    const template = messages[locale][key] ?? messages.en[key] ?? key;
    return interpolate(template, parameters);
  }

  function translateText(value, targetLocale = locale) {
    let result = String(value);
    const targetIndex = targetLocale === "vi" ? 1 : 0;
    const sourceIndex = targetIndex === 0 ? 1 : 0;
    const ordered = phrasePairs.slice().sort((a, b) => b[sourceIndex].length - a[sourceIndex].length);
    for (const pair of ordered) {
      result = result.split(pair[sourceIndex]).join(pair[targetIndex]);
    }
    return result;
  }

  function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (!node.nodeValue.trim()) return;
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "TEXTAREA"].includes(parent.tagName)) return;
      if (!sourceText.has(node)) sourceText.set(node, node.nodeValue);
      node.nodeValue = translateText(sourceText.get(node));
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.dataset && node.dataset.i18n) node.textContent = t(node.dataset.i18n);
    for (const attribute of ["placeholder", "title", "aria-label"]) {
      if (node.hasAttribute(attribute)) {
        const key = `i18nSource${attribute.replace("-", "")}`;
        if (!node.dataset[key]) node.dataset[key] = node.getAttribute(attribute);
        node.setAttribute(attribute, translateText(node.dataset[key]));
      }
    }
    for (const child of node.childNodes) translateNode(child);
  }

  function apply(root = document.body) {
    if (!root) return;
    if (observer) observer.disconnect();
    translateNode(root);
    document.documentElement.lang = locale;
    if (observer) observer.observe(document.body, { childList: true, subtree: true });
  }

  function setLocale(nextLocale, options = {}) {
    locale = normalize(nextLocale);
    if (options.persist !== false) localStorage.setItem(STORAGE_KEY, locale);
    apply();
    window.dispatchEvent(new CustomEvent("manga:languagechange", { detail: { locale } }));
    return locale;
  }

  function number(value, options) {
    return new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US", options).format(value);
  }

  observer = new MutationObserver(records => {
    observer.disconnect();
    for (const record of records) for (const node of record.addedNodes) translateNode(node);
    observer.observe(document.body, { childList: true, subtree: true });
  });

  validateCatalogs();

  window.MANGA_I18N = Object.freeze({
    supported: SUPPORTED.slice(),
    t,
    apply,
    setLocale,
    translateText,
    number,
    get locale() { return locale; }
  });
  window.t = t;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      apply();
      observer.observe(document.body, { childList: true, subtree: true });
    }, { once: true });
  } else {
    apply();
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
