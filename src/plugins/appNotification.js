import { notification } from "antd";

export const appNotification = (desc, title = 'Notification', type = 'info', duration = 6) => {
    notification[type]({
        message: `${title}`,
        description:
          `${desc}`,
        duration: duration
    });
};