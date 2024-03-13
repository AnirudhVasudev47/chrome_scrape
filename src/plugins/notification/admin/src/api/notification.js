import { request } from "@strapi/helper-plugin";

const notificationRequests = {
  getAllNotifications: async () => {
    return await request("/notification/find", {
      method: "GET",
    });
  },

  addNotification: async (data) => {
    return await request(`/notification/create`, {
      method: "POST",
      body: { data: data },
    });
  },

  editNotification: async (id, data) => {
    return await request(`/notification/update/${id}`, {
      method: "PUT",
      body: { data: data },
    });
  },

  deleteNotification: async (id) => {
    return await request(`/notification/delete/${id}`, {
      method: "DELETE",
    });
  },
};

export default notificationRequests;
