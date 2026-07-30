/* ==========================================================================
   DOCI PERFUME - ADMIN ORDERS LOGIC
   Order management logic: Load, filter, search, update status, delete & edit
   ========================================================================== */

function refreshOrders(isManual = false) {
  fetch("backend/orders-api.php")
    .then(res => {
      if (!res.ok) throw new Error("API not available");
      return res.json();
    })
    .then(data => {
      handleReceivedOrders(data, isManual);
    })
    .catch(err => {
      console.error("Local PHP API unavailable:", err);
      const localData = JSON.parse(localStorage.getItem("doci_orders") || "[]");
      handleReceivedOrders(localData, isManual);
    });
}

function handleReceivedOrders(data, isManual) {
  orders = Array.isArray(data) ? data : [];
  
  const deletedIds = JSON.parse(localStorage.getItem("doci_order_deleted") || "[]");
  orders = orders.filter(o => o.id && !deletedIds.includes(o.id));
  
  const overrides = JSON.parse(localStorage.getItem("doci_order_overrides") || "{}");
  const edits = JSON.parse(localStorage.getItem("doci_order_edits") || "{}");

  orders.forEach(o => {
    if (o.id) {
      if (overrides[o.id]) {
        o.status = overrides[o.id];
      }
      if (edits[o.id]) {
        o.customerName = edits[o.id].customerName;
        o.customerPhone = edits[o.id].customerPhone;
        o.customerAddress = edits[o.id].customerAddress;
        o.customerNote = edits[o.id].customerNote;
        o.totalPrice = edits[o.id].totalPrice;
        o.status = edits[o.id].status;
      }
    }
  });
  
  orders.sort((a, b) => new Date(b.date) - new Date(a.date));

  let newOrdersCount = 0;
  if (firstLoad) {
    orders.forEach(o => {
      if (o.id) knownOrderIds.add(o.id);
    });
    firstLoad = false;
  } else {
    orders.forEach(o => {
      if (o.id && !knownOrderIds.has(o.id)) {
        knownOrderIds.add(o.id);
        newOrdersCount++;
      }
    });

    if (newOrdersCount > 0) {
      if (typeof playChime === "function") playChime();
      if (typeof showToast === "function") showToast(`🔔 RECEIVED ${newOrdersCount} NEW ORDER(S)!`, "success", 6000);
    }
  }

  updateStats();
  renderOrders();
  
  if (isManual && typeof showToast === "function") {
    showToast("Order list refreshed!", "info");
  }
}

function updateStats() {
  const total = orders.length;
  const pending = orders.filter(o => o.status === 'pending').length;
  const confirmed = orders.filter(o => o.status === 'confirmed').length;
  const cancelled = orders.filter(o => o.status === 'cancelled').length;

  const totalRevenue = orders
    .filter(o => o.status === 'pending' || o.status === 'confirmed')
    .reduce((sum, o) => sum + (parseFloat(o.totalPrice) || 0), 0);

  const revEl = document.getElementById("stat-revenue");
  const totEl = document.getElementById("stat-total-orders");
  const penEl = document.getElementById("stat-pending");
  const conEl = document.getElementById("stat-confirmed");

  if (revEl) revEl.innerText = formatPrice(totalRevenue);
  if (totEl) totEl.innerText = total;
  if (penEl) penEl.innerText = pending;
  if (conEl) conEl.innerText = confirmed;

  const cAll = document.getElementById("count-all");
  const cPen = document.getElementById("count-pending");
  const cCon = document.getElementById("count-confirmed");
  const cCan = document.getElementById("count-cancelled");

  if (cAll) cAll.innerText = total;
  if (cPen) cPen.innerText = pending;
  if (cCon) cCon.innerText = confirmed;
  if (cCan) cCan.innerText = cancelled;
}

function setFilter(filter) {
  currentFilter = filter;
  
  const tabs = ["all", "pending", "confirmed", "cancelled"];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-${t}`);
    if (btn) {
      if (t === filter) {
        btn.className = "px-4 py-2 rounded-md text-xs font-semibold tracking-wider transition-all bg-gold text-black";
      } else {
        btn.className = "px-4 py-2 rounded-md text-xs font-semibold tracking-wider transition-all bg-white/5 text-gray-400 hover:text-white";
      }
    }
  });

  renderOrders();
}

function handleOrderSearch() {
  const searchInput = document.getElementById("order-search-input");
  if (searchInput) {
    orderSearchQuery = searchInput.value.trim().toLowerCase();
  }
  renderOrders();
}

function renderOrders() {
  const container = document.getElementById("orders-list-container");
  const noOrdersMsg = document.getElementById("no-orders-msg");
  if (!container) return;
  
  const oldCards = container.querySelectorAll(".order-card");
  oldCards.forEach(c => c.remove());

  let filteredOrders = orders;
  if (currentFilter !== "all") {
    filteredOrders = orders.filter(o => o.status === currentFilter);
  }

  if (orderSearchQuery) {
    filteredOrders = filteredOrders.filter(o => {
      const matchesOrderId = o.id && o.id.toLowerCase().includes(orderSearchQuery);
      const matchesCustomerName = o.customerName && o.customerName.toLowerCase().includes(orderSearchQuery);
      const matchesCustomerPhone = o.customerPhone && o.customerPhone.toLowerCase().includes(orderSearchQuery);
      const matchesItems = o.items && o.items.some(item => {
        const itemName = item.name || "";
        const itemId = item.id || "";
        return itemName.toLowerCase().includes(orderSearchQuery) || itemId.toLowerCase().includes(orderSearchQuery);
      });
      return matchesOrderId || matchesCustomerName || matchesCustomerPhone || matchesItems;
    });
  }

  if (filteredOrders.length === 0) {
    if (noOrdersMsg) noOrdersMsg.classList.remove("hidden");
    return;
  }
  if (noOrdersMsg) noOrdersMsg.classList.add("hidden");

  filteredOrders.forEach(order => {
    const card = document.createElement("div");
    card.className = "order-card glass-card rounded-xl p-5 md:p-6 transition-all border border-white/5 hover:border-gold/20 flex flex-col lg:flex-row lg:items-center justify-between gap-6";
    
    let statusBadge = "";
    let actionButtons = "";
    
    if (order.status === 'pending') {
      statusBadge = `<span class="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[10px] font-bold px-2 py-0.5 rounded">Pending</span>`;
      actionButtons = `
        <button onclick="updateOrderStatus('${order.id}', 'confirmed')" class="bg-green-600 hover:bg-green-500 text-white text-[11px] font-bold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5"><i class="fa-solid fa-check"></i> Confirm</button>
        <button onclick="updateOrderStatus('${order.id}', 'cancelled')" class="bg-red-950/40 hover:bg-red-900/50 border border-red-500/20 text-red-400 text-[11px] font-bold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5"><i class="fa-solid fa-xmark"></i> Cancel</button>
      `;
    } else if (order.status === 'confirmed') {
      statusBadge = `<span class="bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] font-bold px-2 py-0.5 rounded">Confirmed</span>`;
      actionButtons = `
        <button onclick="updateOrderStatus('${order.id}', 'pending')" class="bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] font-semibold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5"><i class="fa-solid fa-rotate-left"></i> Revert</button>
        <button onclick="updateOrderStatus('${order.id}', 'cancelled')" class="bg-red-950/40 hover:bg-red-900/50 border border-red-500/20 text-red-400 text-[11px] font-bold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5"><i class="fa-solid fa-xmark"></i> Cancel</button>
      `;
    } else if (order.status === 'cancelled') {
      statusBadge = `<span class="bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-bold px-2 py-0.5 rounded">Cancelled</span>`;
      actionButtons = `
        <button onclick="updateOrderStatus('${order.id}', 'pending')" class="bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] font-semibold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5"><i class="fa-solid fa-rotate-left"></i> Restore</button>
      `;
    }

    const payMethod = order.paymentMethod === 'bank' 
      ? `<span class="text-blue-400"><i class="fa-solid fa-building-columns text-[9px] mr-1"></i>Bank Transfer</span>`
      : `<span class="text-yellow-600"><i class="fa-solid fa-truck-ramp-box text-[9px] mr-1"></i>COD Payment</span>`;

    const orderDate = new Date(order.date).toLocaleString('en-US');

    let itemsHtml = "";
    if (Array.isArray(order.items)) {
      order.items.forEach(item => {
        itemsHtml += `
          <div class="flex justify-between items-center text-xs text-gray-400 border-b border-white/5 pb-1">
            <span>Item <strong>${item.name || item.id}</strong> <span class="text-gray-600">x${item.quantity}</span></span>
            <span class="text-gray-300 font-medium">${formatPrice(item.price * item.quantity)}</span>
          </div>
        `;
      });
    }

    card.innerHTML = `
      <div class="flex-grow space-y-3 max-w-lg">
        <div class="flex items-center gap-3">
          <span class="text-xs font-bold text-gold font-title tracking-wider">${order.id}</span>
          <span class="text-[10px] text-gray-500">${orderDate}</span>
          ${statusBadge}
        </div>
        <div class="space-y-1">
          <p class="text-xs font-semibold text-white"><i class="fa-regular fa-user text-[10px] text-gold w-4"></i> Customer: ${order.customerName}</p>
          <p class="text-xs text-gray-300"><i class="fa-solid fa-phone text-[10px] text-gold w-4"></i> Phone: <a href="tel:${order.customerPhone}" class="hover:underline text-gold">${order.customerPhone}</a></p>
          <p class="text-xs text-gray-400"><i class="fa-solid fa-location-dot text-[10px] text-gold w-4"></i> Address: ${order.customerAddress}</p>
          ${order.customerNote ? `<p class="text-xs text-gray-500 italic"><i class="fa-regular fa-comment text-[10px] text-gold w-4"></i> Note: ${order.customerNote}</p>` : ""}
        </div>
      </div>

      <div class="w-full lg:w-72 space-y-2 lg:border-l lg:border-white/10 lg:pl-6">
        <span class="text-[9px] text-gray-500 uppercase tracking-wider block">Product Details</span>
        <div class="space-y-1.5 max-h-24 overflow-y-auto pr-1">
          ${itemsHtml}
        </div>
        <div class="flex justify-between items-center text-xs mt-2 pt-1 border-t border-white/10">
          <span class="font-semibold text-white">Total:</span>
          <span class="font-bold text-gold text-sm">${formatPrice(order.totalPrice)}</span>
        </div>
        <div class="text-[10px] mt-1">
          Payment: ${payMethod}
        </div>
      </div>

      <div class="flex lg:flex-col items-center justify-end gap-2 lg:w-36 flex-shrink-0">
        ${actionButtons}
        <button onclick="openEditOrderModal('${order.id}')" class="bg-blue-950/30 hover:bg-blue-900/60 border border-blue-500/20 hover:border-blue-500/50 text-blue-400 text-[11px] font-bold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5 w-full justify-center"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
        <button onclick="deleteSingleOrder('${order.id}')" class="bg-red-950/30 hover:bg-red-900/60 border border-red-500/20 hover:border-red-500/50 text-red-400 text-[11px] font-bold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5 w-full justify-center"><i class="fa-solid fa-trash"></i> Delete</button>
      </div>
    `;
    
    container.appendChild(card);
  });
}

function updateOrderStatus(orderId, newStatus) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
  } else {
    if (typeof showToast === "function") showToast("Order not found", "error");
    return;
  }

  fetch("backend/orders-api.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "update_status",
      orderId: orderId,
      status: newStatus
    })
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if (typeof showToast === "function") showToast("Status updated successfully!", "success");
      refreshOrders();
    } else {
      throw new Error(res.message);
    }
  })
  .catch(err => {
    console.error("PHP API status update error:", err);
    const overrides = JSON.parse(localStorage.getItem("doci_order_overrides") || "{}");
    overrides[orderId] = newStatus;
    localStorage.setItem("doci_order_overrides", JSON.stringify(overrides));
    const o = orders.find(item => item.id === orderId);
    if (o) o.status = newStatus;
    if (typeof showToast === "function") showToast("Saved order status locally!", "success");
    updateStats();
    renderOrders();
  });
}

function clearAllOrders() {
  if (!confirm("⚠️ Are you sure you want to clear all order history? This action cannot be undone!")) return;
  
  fetch("backend/orders-api.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "clear_all" })
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if (typeof showToast === "function") showToast("All orders cleared successfully!", "success");
      refreshOrders();
    } else {
      throw new Error(res.message);
    }
  })
  .catch(err => {
    console.error("Clear orders error:", err);
    localStorage.setItem("doci_orders", JSON.stringify([]));
    localStorage.removeItem("doci_order_overrides");
    localStorage.removeItem("doci_order_deleted");
    localStorage.removeItem("doci_order_edits");
    if (typeof showToast === "function") showToast("Cleared order history in local browser storage!", "success");
    refreshOrders();
  });
}

function deleteSingleOrder(orderId) {
  if (!confirm(`⚠️ Are you sure you want to delete order ${orderId}?`)) return;
  
  orders = orders.filter(o => o.id !== orderId);

  fetch("backend/orders-api.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "delete_order",
      orderId: orderId
    })
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if (typeof showToast === "function") showToast("Order deleted successfully!", "success");
      refreshOrders();
    } else {
      throw new Error(res.message);
    }
  })
  .catch(err => {
    console.error("Delete order error:", err);
    const deleted = JSON.parse(localStorage.getItem("doci_order_deleted") || "[]");
    deleted.push(orderId);
    localStorage.setItem("doci_order_deleted", JSON.stringify(deleted));
    if (typeof showToast === "function") showToast("Order deleted (Saved locally)!", "success");
    updateStats();
    refreshOrders();
  });
}

function openEditOrderModal(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;
  
  document.getElementById("edit-order-id").value = order.id;
  document.getElementById("edit-modal-order-id").innerText = `(${order.id})`;
  document.getElementById("edit-customer-name").value = order.customerName || "";
  document.getElementById("edit-customer-phone").value = order.customerPhone || "";
  document.getElementById("edit-customer-address").value = order.customerAddress || "";
  document.getElementById("edit-customer-note").value = order.customerNote || "";
  document.getElementById("edit-order-total").value = order.totalPrice || 0;
  document.getElementById("edit-order-status").value = order.status || "pending";
  
  const modal = document.getElementById("edit-order-modal");
  if (modal) {
    modal.classList.add("open");
    modal.classList.remove("opacity-0", "pointer-events-none");
  }
}

function closeEditOrderModal() {
  const modal = document.getElementById("edit-order-modal");
  if (modal) {
    modal.classList.remove("open");
    modal.classList.add("opacity-0", "pointer-events-none");
  }
}

function handleSaveEditedOrder(event) {
  event.preventDefault();
  
  const orderId = document.getElementById("edit-order-id").value;
  const customerName = document.getElementById("edit-customer-name").value.trim();
  const customerPhone = document.getElementById("edit-customer-phone").value.trim();
  const customerAddress = document.getElementById("edit-customer-address").value.trim();
  const customerNote = document.getElementById("edit-customer-note").value.trim();
  const totalPrice = parseFloat(document.getElementById("edit-order-total").value);
  const status = document.getElementById("edit-order-status").value;
  
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.customerName = customerName;
    order.customerPhone = customerPhone;
    order.customerAddress = customerAddress;
    order.customerNote = customerNote;
    order.totalPrice = totalPrice;
    order.status = status;
  } else {
    if (typeof showToast === "function") showToast("Could not find order to edit", "error");
    closeEditOrderModal();
    return;
  }

  fetch("backend/orders-api.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "update_order",
      orderId,
      customerName,
      customerPhone,
      customerAddress,
      customerNote,
      totalPrice,
      status
    })
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if (typeof showToast === "function") showToast("Order updated successfully!", "success");
      closeEditOrderModal();
      refreshOrders();
    } else {
      throw new Error(res.message);
    }
  })
  .catch(err => {
    console.error("Update order error:", err);
    const editedOrders = JSON.parse(localStorage.getItem("doci_order_edits") || "{}");
    editedOrders[orderId] = { customerName, customerPhone, customerAddress, customerNote, totalPrice, status };
    localStorage.setItem("doci_order_edits", JSON.stringify(editedOrders));
    if (typeof showToast === "function") showToast("Order updated (Saved locally)!", "success");
    closeEditOrderModal();
    updateStats();
    refreshOrders();
  });
}
