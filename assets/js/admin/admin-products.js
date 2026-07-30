/* ==========================================================================
   DOCI PERFUME - ADMIN PRODUCTS & INVENTORY LOGIC
   Product Catalog Management: Add product, edit price, manage stock & inventory
   ========================================================================== */

let adminProducts = [];
let currentProductFilter = "all";
let productSearchQuery = "";

function refreshProducts(isManual = false) {
  adminProducts = typeof window.getAppProducts === "function" ? window.getAppProducts() : (window.perfumeData || []);
  updateProductStats();
  renderProductsList();

  if (isManual && typeof showToast === "function") {
    showToast("Product catalog & inventory refreshed!", "info");
  }
}

function updateProductStats() {
  const totalProds = adminProducts.length;
  const totalStock = adminProducts.reduce((sum, p) => sum + (parseInt(p.stock) || 0), 0);
  const lowStock = adminProducts.filter(p => (parseInt(p.stock) || 0) > 0 && (parseInt(p.stock) || 0) <= 10).length;
  const outOfStock = adminProducts.filter(p => (parseInt(p.stock) || 0) <= 0).length;

  const totProdEl = document.getElementById("stat-total-products");
  const totStockEl = document.getElementById("stat-total-stock");
  const lowStockEl = document.getElementById("stat-low-stock");
  const outStockEl = document.getElementById("stat-out-stock");

  if (totProdEl) totProdEl.innerText = totalProds;
  if (totStockEl) totStockEl.innerText = totalStock.toLocaleString();
  if (lowStockEl) lowStockEl.innerText = lowStock;
  if (outStockEl) outStockEl.innerText = outOfStock;

  const cAll = document.getElementById("count-p-all");
  const cMen = document.getElementById("count-p-men");
  const cWomen = document.getElementById("count-p-women");

  const menCount = adminProducts.filter(p => p.gender === "men").length;
  const womenCount = adminProducts.filter(p => p.gender === "women").length;

  if (cAll) cAll.innerText = totalProds;
  if (cMen) cMen.innerText = menCount;
  if (cWomen) cWomen.innerText = womenCount;
}

function setProductFilter(filter) {
  currentProductFilter = filter;
  const tabs = ["all", "men", "women"];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-p-${t}`);
    if (btn) {
      if (t === filter) {
        btn.className = "px-4 py-2 rounded-md text-xs font-semibold tracking-wider transition-all bg-gold text-black";
      } else {
        btn.className = "px-4 py-2 rounded-md text-xs font-semibold tracking-wider transition-all bg-white/5 text-gray-400 hover:text-white";
      }
    }
  });
  renderProductsList();
}

function handleProductSearch() {
  const searchInput = document.getElementById("product-search-input");
  if (searchInput) {
    productSearchQuery = searchInput.value.trim().toLowerCase();
  }
  renderProductsList();
}

function renderProductsList() {
  const container = document.getElementById("products-list-container");
  const noProdsMsg = document.getElementById("no-products-msg");
  if (!container) return;

  const oldCards = container.querySelectorAll(".product-item-card");
  oldCards.forEach(c => c.remove());

  let filtered = adminProducts;
  if (currentProductFilter === "men" || currentProductFilter === "women") {
    filtered = adminProducts.filter(p => p.gender === currentProductFilter);
  }

  if (productSearchQuery) {
    filtered = filtered.filter(p => {
      const nameMatch = p.name && p.name.toLowerCase().includes(productSearchQuery);
      const idMatch = p.id && p.id.toLowerCase().includes(productSearchQuery);
      const inspiredMatch = p.inspiredBy && p.inspiredBy.toLowerCase().includes(productSearchQuery);
      const categoryMatch = p.category && p.category.toLowerCase().includes(productSearchQuery);
      return nameMatch || idMatch || inspiredMatch || categoryMatch;
    });
  }

  if (filtered.length === 0) {
    if (noProdsMsg) noProdsMsg.classList.remove("hidden");
    return;
  }
  if (noProdsMsg) noProdsMsg.classList.add("hidden");

  filtered.forEach(prod => {
    const card = document.createElement("div");
    const stockNum = parseInt(prod.stock) || 0;
    
    let stockBadge = "";
    if (stockNum <= 0) {
      stockBadge = `<span class="bg-red-500/10 text-red-500 border border-red-500/30 text-[10px] font-bold px-2 py-0.5 rounded">Out of Stock (0)</span>`;
    } else if (stockNum <= 10) {
      stockBadge = `<span class="bg-amber-500/10 text-amber-500 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded">Low Stock (${stockNum})</span>`;
    } else {
      stockBadge = `<span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">In Stock (${stockNum})</span>`;
    }

    card.className = "product-item-card glass-card rounded-xl p-4 md:p-5 transition-all border border-white/5 hover:border-gold/30 flex flex-col md:flex-row items-center justify-between gap-5";

    card.innerHTML = `
      <div class="flex items-center gap-4 w-full md:w-auto">
        <div class="w-16 h-16 rounded-lg bg-black/40 border border-white/10 p-1 flex-shrink-0 flex items-center justify-center">
          <img src="${prod.image}" alt="${prod.name}" class="object-contain max-h-full max-w-full rounded">
        </div>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <h4 class="font-title text-base font-bold text-white">${prod.name}</h4>
            ${stockBadge}
            <span class="text-[9px] uppercase tracking-wider bg-gold/10 text-gold px-2 py-0.5 rounded font-semibold border border-gold/20">${prod.gender === 'men' ? 'Men' : prod.gender === 'women' ? 'Women' : 'Unisex'}</span>
          </div>
          <p class="text-xs text-gray-400 italic">Inspired by: ${prod.inspiredBy}</p>
          <span class="text-[10px] text-gray-500">${prod.category} • ${prod.longevity || '6-8 Hours'}</span>
        </div>
      </div>

      <div class="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
        <div class="text-left md:text-right">
          <span class="text-[9px] text-gray-500 uppercase tracking-wider block">Price / Original</span>
          <div class="flex items-baseline gap-2">
            <span class="text-sm font-bold text-gold">${formatPrice(prod.price)}</span>
            <span class="text-xs text-gray-500 line-through">${formatPrice(prod.originalPrice)}</span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="openProductModal('${prod.id}')" class="bg-gold/10 hover:bg-gold/20 border border-gold/30 hover:border-gold/60 text-gold text-xs font-bold px-3 py-2 rounded-lg transition-all flex items-center gap-1.5" title="Edit Product & Stock">
            <i class="fa-solid fa-pen-to-square"></i> Edit
          </button>
          <button onclick="deleteProduct('${prod.id}')" class="bg-red-950/30 hover:bg-red-900/60 border border-red-500/20 hover:border-red-500/50 text-red-400 text-xs font-bold px-3 py-2 rounded-lg transition-all flex items-center gap-1.5" title="Delete Product">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function openProductModal(productId = null) {
  const modal = document.getElementById("product-modal");
  const form = document.getElementById("product-form");
  const modalTitle = document.getElementById("product-modal-title");

  if (!modal || !form) return;

  if (productId) {
    const prod = adminProducts.find(p => p.id === productId);
    if (!prod) return;

    if (modalTitle) modalTitle.innerHTML = `<i class="fa-solid fa-pen-to-square mr-2"></i>Edit Product: <span class="text-white">${prod.name}</span>`;

    document.getElementById("prod-modal-id").value = prod.id;
    document.getElementById("prod-sku").value = prod.id;
    document.getElementById("prod-sku").readOnly = true;
    document.getElementById("prod-name").value = prod.name || "";
    document.getElementById("prod-inspired").value = prod.inspiredBy || "";
    document.getElementById("prod-gender").value = prod.gender || "men";
    document.getElementById("prod-category").value = prod.category || "Fresh & Crisp";
    document.getElementById("prod-price").value = prod.price || 319000;
    document.getElementById("prod-original-price").value = prod.originalPrice || 450000;
    document.getElementById("prod-stock").value = prod.stock !== undefined ? prod.stock : 50;
    document.getElementById("prod-image").value = prod.image || "";
    document.getElementById("prod-longevity").value = prod.longevity || "6 - 8 Hours";
    document.getElementById("prod-projection").value = prod.projection || "1 - 2 Meters";
    document.getElementById("prod-description").value = prod.description || "";
  } else {
    if (modalTitle) modalTitle.innerHTML = `<i class="fa-solid fa-plus-circle mr-2"></i>Add New Product`;

    form.reset();
    document.getElementById("prod-modal-id").value = "";
    document.getElementById("prod-sku").value = "prod-" + Date.now();
    document.getElementById("prod-sku").readOnly = false;
    document.getElementById("prod-price").value = 319000;
    document.getElementById("prod-original-price").value = 450000;
    document.getElementById("prod-stock").value = 50;
    document.getElementById("prod-longevity").value = "6 - 8 Hours";
    document.getElementById("prod-projection").value = "1 - 2 Meters";
  }

  modal.classList.add("open");
  modal.classList.remove("opacity-0", "pointer-events-none");
}

function closeProductModal() {
  const modal = document.getElementById("product-modal");
  if (modal) {
    modal.classList.remove("open");
    modal.classList.add("opacity-0", "pointer-events-none");
  }
}

function handleSaveProduct(event) {
  event.preventDefault();

  const id = document.getElementById("prod-sku").value.trim();
  const name = document.getElementById("prod-name").value.trim();
  const inspiredBy = document.getElementById("prod-inspired").value.trim();
  const gender = document.getElementById("prod-gender").value;
  const category = document.getElementById("prod-category").value.trim();
  const price = parseFloat(document.getElementById("prod-price").value) || 0;
  const originalPrice = parseFloat(document.getElementById("prod-original-price").value) || 0;
  const stock = parseInt(document.getElementById("prod-stock").value) || 0;
  const image = document.getElementById("prod-image").value.trim() || "assets/images/1783734467461_7983307016412442049_g2758941255649715778_3225eab47b7f0c8a09b1b9593a06cc85.jpg";
  const longevity = document.getElementById("prod-longevity").value.trim() || "6 - 8 Hours";
  const projection = document.getElementById("prod-projection").value.trim() || "1 - 2 Meters";
  const description = document.getElementById("prod-description").value.trim();

  if (!id || !name || !price) {
    if (typeof showToast === "function") showToast("Please fill in required fields (ID, Name, Price)", "error");
    return;
  }

  let products = typeof window.getAppProducts === "function" ? window.getAppProducts() : [...adminProducts];
  const existingIdx = products.findIndex(p => p.id === id);

  if (existingIdx !== -1) {
    products[existingIdx] = {
      ...products[existingIdx],
      name,
      inspiredBy,
      gender,
      category,
      price,
      originalPrice,
      stock,
      image,
      longevity,
      projection,
      description
    };
    if (typeof showToast === "function") showToast(`Updated product "${name}" successfully!`, "success");
  } else {
    const newProduct = {
      id,
      name,
      inspiredBy,
      gender,
      category,
      price,
      originalPrice,
      stock,
      rating: 5.0,
      reviewsCount: 1,
      image,
      longevity,
      projection,
      description,
      season: "All Seasons",
      occasion: "Daily, Office, Events",
      notes: {
        top: "Fresh Citrus",
        middle: "Floral, Spices",
        base: "Cedarwood, Musk"
      }
    };
    products.unshift(newProduct);
    if (typeof showToast === "function") showToast(`Added new product "${name}" successfully!`, "success");
  }

  if (typeof window.saveAppProducts === "function") {
    window.saveAppProducts(products);
  } else {
    localStorage.setItem("doci_perfume_products", JSON.stringify(products));
  }

  closeProductModal();
  refreshProducts();
}

function deleteProduct(productId) {
  const prod = adminProducts.find(p => p.id === productId);
  if (!prod) return;

  if (!confirm(`⚠️ Are you sure you want to delete product "${prod.name}" (${prod.id})?`)) return;

  let products = typeof window.getAppProducts === "function" ? window.getAppProducts() : [...adminProducts];
  products = products.filter(p => p.id !== productId);

  if (typeof window.saveAppProducts === "function") {
    window.saveAppProducts(products);
  } else {
    localStorage.setItem("doci_perfume_products", JSON.stringify(products));
  }

  if (typeof showToast === "function") showToast(`Deleted product "${prod.name}"`, "success");
  refreshProducts();
}
