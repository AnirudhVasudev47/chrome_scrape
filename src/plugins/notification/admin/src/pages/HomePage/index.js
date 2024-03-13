/*
 *
 * HomePage
 *
 */

import React, {useEffect, useState} from 'react';
// import PropTypes from 'prop-types';
import pluginPkg from "../../../../package.json";
import {BaseHeaderLayout, Button, ContentLayout, EmptyStateLayout, Layout, Box} from '@strapi/design-system';
import {LoadingIndicatorPage} from "@strapi/helper-plugin";
import {Cross, Plus} from "@strapi/icons";
import ModalAddNotification from "../../components/ModalAddNotification";
import NotificationTable from "../../components/NotificationTable";
import EmptyIcon from "../../components/PluginIcon/EmptyIcon";
import notificationRequests from "../../api/notification";

const HomePage = () => {
  const dataArr = [
    'asdasdas',
    'asdasdas',
    'asdasdas',
    'asdasdas',
    'asdasdas',
  ]
  const [notificationStatus, setNotificationStatus] = useState({
    isLoading: true,
    isModalVisible: false,
  })
  const [notificationList, setNotificationList] = useState([])

  const fetchData = async () => {
    if (notificationStatus.isLoading === false) setNotificationStatus({
      ...notificationStatus,
      isLoading: true
    });

    try {
      const notifications = await notificationRequests.getAllNotifications();
      console.log("notifications: ", notifications)
      setNotificationList([
        ...notifications
      ]);
    } catch (error) {
      console.log('error fetching notifications', error);
    } finally {
      setNotificationStatus({
        ...notificationStatus,
        isLoading: false
      });
    }
  };

  async function addTodo(data) {
    await notificationRequests.addNotification(data);
    await fetchData();
  }

  async function deleteTodo(data) {
    await notificationRequests.deleteNotification(data.id);
    await fetchData();
  }

  async function editTodo(id, data) {
    await notificationRequests.editNotification(id, data);
    await fetchData();
  }

  const onAddNotification = () => setNotificationStatus({
    ...notificationStatus,
    isModalVisible: true,
  })

  useEffect(() => {
    fetchData();
  }, []);

  if (notificationStatus.isLoading) return <LoadingIndicatorPage/>;

  return (
    <Layout>
      <BaseHeaderLayout
        primaryAction={<Button startIcon={<Plus/>} onClick={onAddNotification}>Add an entry</Button>}
        title="Notification Plugin"
        as="h2"/>
      <ContentLayout>
        {notificationList.length === 0
          ? <Box padding={8} background="neutral100">
            <EmptyStateLayout
              icon={<EmptyIcon/>} content="You don't have any notification yet..."
              action={<Button
                variant="secondary" startIcon={<Plus/>} onClick={onAddNotification}>
                Create your first notification
              </Button>}/>
          </Box>
          : <>
            <NotificationTable onAddTable={onAddNotification} data={notificationList}/>
          </>}
      </ContentLayout>
      {notificationStatus.isModalVisible
        ? <ModalAddNotification onClose={() => setNotificationStatus({
          ...notificationStatus,
          isModalVisible: false,
        })}/>
        : null
      }
    </Layout>
  );
};

export default HomePage;
