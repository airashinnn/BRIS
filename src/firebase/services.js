import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  orderBy,
  limit,
  Timestamp
} from "firebase/firestore";
import { db } from "./config";

// ============ RESIDENTS ============
export const getResidents = async () => {
  try {
    const residentsCol = collection(db, "residents");
    const residentSnapshot = await getDocs(residentsCol);
    return residentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting residents:", error);
    return [];
  }
};

export const getResidentById = async (id) => {
  try {
    const residentDoc = doc(db, "residents", id);
    const residentSnapshot = await getDoc(residentDoc);
    if (residentSnapshot.exists()) {
      return { id: residentSnapshot.id, ...residentSnapshot.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting resident:", error);
    return null;
  }
};

// ============ ANNOUNCEMENTS ============
export const getAnnouncements = async () => {
  try {
    const announcementsCol = collection(db, "announcements");
    const q = query(announcementsCol, orderBy("createdAt", "desc"));
    const announcementSnapshot = await getDocs(q);
    return announcementSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().createdAt?.toDate?.().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) || "Unknown date"
    }));
  } catch (error) {
    console.error("Error getting announcements:", error);
    return [];
  }
};

export const addAnnouncement = async (announcementData) => {
  try {
    const announcementsCol = collection(db, "announcements");
    const docRef = await addDoc(announcementsCol, {
      ...announcementData,
      status: "active",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return { id: docRef.id, ...announcementData };
  } catch (error) {
    console.error("Error adding announcement:", error);
    throw error;
  }
};

// ============ SERVICES ============
export const getServices = async () => {
  try {
    const servicesCol = collection(db, "services");
    const servicesSnapshot = await getDocs(servicesCol);
    return servicesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting services:", error);
    return [];
  }
};

export const addService = async (serviceData) => {
  try {
    const servicesCol = collection(db, "services");
    const docRef = await addDoc(servicesCol, {
      ...serviceData,
      status: "active",
      createdAt: Timestamp.now()
    });
    return { id: docRef.id, ...serviceData };
  } catch (error) {
    console.error("Error adding service:", error);
    throw error;
  }
};

// ============ REQUESTS ============
export const getRequests = async () => {
  try {
    const requestsCol = collection(db, "requests");
    const q = query(requestsCol, orderBy("createdAt", "desc"));
    const requestSnapshot = await getDocs(q);
    return requestSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().createdAt?.toDate?.().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) || "Unknown date"
    }));
  } catch (error) {
    console.error("Error getting requests:", error);
    return [];
  }
};

export const getRequestsByResident = async (residentId) => {
  try {
    const requestsCol = collection(db, "requests");
    const q = query(
      requestsCol, 
      where("residentId", "==", residentId),
      orderBy("createdAt", "desc")
    );
    const requestSnapshot = await getDocs(q);
    return requestSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().createdAt?.toDate?.().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) || "Unknown date"
    }));
  } catch (error) {
    console.error("Error getting resident requests:", error);
    return [];
  }
};

export const addRequest = async (requestData) => {
  try {
    const requestsCol = collection(db, "requests");
    const docRef = await addDoc(requestsCol, {
      ...requestData,
      status: "pending",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return { id: docRef.id, ...requestData };
  } catch (error) {
    console.error("Error adding request:", error);
    throw error;
  }
};

export const updateRequestStatus = async (id, status, processedBy = null) => {
  try {
    const requestDoc = doc(db, "requests", id);
    const updateData = {
      status,
      updatedAt: Timestamp.now()
    };
    if (processedBy) {
      updateData.processedBy = processedBy;
      if (status === "completed") {
        updateData.completedAt = Timestamp.now();
      }
    }
    await updateDoc(requestDoc, updateData);
    return true;
  } catch (error) {
    console.error("Error updating request:", error);
    throw error;
  }
};

// ============ NOTIFICATIONS ============
export const getNotifications = async (residentId) => {
  try {
    const notificationsCol = collection(db, "notifications");
    const q = query(
      notificationsCol, 
      where("residentId", "==", residentId),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const notificationSnapshot = await getDocs(q);
    return notificationSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().createdAt?.toDate?.().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) || "Unknown date"
    }));
  } catch (error) {
    console.error("Error getting notifications:", error);
    return [];
  }
};

export const addNotification = async (notificationData) => {
  try {
    const notificationsCol = collection(db, "notifications");
    const docRef = await addDoc(notificationsCol, {
      ...notificationData,
      read: false,
      createdAt: Timestamp.now()
    });
    return { id: docRef.id, ...notificationData };
  } catch (error) {
    console.error("Error adding notification:", error);
    throw error;
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const notificationDoc = doc(db, "notifications", id);
    await updateDoc(notificationDoc, {
      read: true
    });
    return true;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

export const getUnreadNotificationsCount = async (residentId) => {
  try {
    const notificationsCol = collection(db, "notifications");
    const q = query(
      notificationsCol, 
      where("residentId", "==", residentId),
      where("read", "==", false)
    );
    const notificationSnapshot = await getDocs(q);
    return notificationSnapshot.size;
  } catch (error) {
    console.error("Error getting unread count:", error);
    return 0;
  }
};