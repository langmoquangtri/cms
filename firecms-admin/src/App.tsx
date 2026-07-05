import React, { useCallback, useMemo } from 'react';

import {
  AppBar,
  Authenticator,
  CircularProgressCenter,
  Drawer,
  FireCMS,
  FireCMSi18nProvider,
  ModeControllerProvider,
  NavigationRoutes,
  Scaffold,
  SideDialogs,
  SnackbarProvider,
  useBuildLocalConfigurationPersistence,
  useBuildModeController,
  useBuildNavigationController,
  useValidateAuthenticator,
} from '@firecms/core';

import {
  FirebaseAuthController,
  FirebaseLoginView,
  FirebaseSignInProvider,
  FirebaseUserWrapper,
  useFirebaseAuthController,
  useFirebaseStorageSource,
  useFirestoreDelegate,
  useInitialiseFirebase,
} from '@firecms/firebase';

import { CenteredView } from '@firecms/ui';

import { categoriesCollection } from './collections/categories';
import { productsCollection } from './collections/products';
import { firebaseConfig } from './firebase_config';

const ADMIN_EMAIL = 'langmoquantri@gmail.com';

function App() {
  /**
   * Chỉ cho phép đúng email admin truy cập CMS
   */
  const myAuthenticator: Authenticator<FirebaseUserWrapper> = useCallback(
    async ({ user }) => {
      const email = user?.email?.toLowerCase().trim();

      if (!email) {
        return false;
      }

      return email === ADMIN_EMAIL;
    },
    []
  );

  /**
   * Các collection hiển thị trong menu CMS
   */
  const collections = useMemo(
    () => [categoriesCollection, productsCollection],
    []
  );

  /**
   * Khởi tạo Firebase
   */
  const { firebaseApp, firebaseConfigLoading, configError } =
    useInitialiseFirebase({
      firebaseConfig,
    });

  /**
   * Dark / Light mode
   */
  const modeController = useBuildModeController();

  /**
   * Chỉ sử dụng Email / Password
   */
  const signInOptions: FirebaseSignInProvider[] = ['password'];

  /**
   * Firebase Authentication controller
   */
  const authController: FirebaseAuthController = useFirebaseAuthController({
    firebaseApp,
    signInOptions,
  });

  /**
   * Lưu cấu hình giao diện người dùng
   */
  const userConfigPersistence = useBuildLocalConfigurationPersistence();

  /**
   * Kết nối Cloud Firestore
   */
  const firestoreDelegate = useFirestoreDelegate({
    firebaseApp,
  });

  /**
   * Kết nối Firebase Storage
   */
  const storageSource = useFirebaseStorageSource({
    firebaseApp,
  });

  /**
   * Kiểm tra quyền truy cập CMS
   */
  const { authLoading, canAccessMainView, notAllowedError } =
    useValidateAuthenticator({
      authController,
      authenticator: myAuthenticator,
      dataSourceDelegate: firestoreDelegate,
      storageSource,
    });

  /**
   * Điều hướng collection
   */
  const navigationController = useBuildNavigationController({
    disabled: authLoading,
    collections,
    authController,
    dataSourceDelegate: firestoreDelegate,
  });

  /**
   * Firebase đang khởi tạo
   */
  if (firebaseConfigLoading) {
    return <CircularProgressCenter />;
  }

  /**
   * Firebase config có lỗi
   */
  if (configError) {
    return (
      <CenteredView>
        <div
          style={{
            padding: 24,
            maxWidth: 700,
          }}
        >
          <h2>Lỗi cấu hình Firebase</h2>

          <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {String(configError)}
          </pre>
        </div>
      </CenteredView>
    );
  }

  /**
   * Firebase App không khởi tạo được
   */
  if (!firebaseApp) {
    return (
      <CenteredView>
        <div style={{ padding: 24 }}>Không thể khởi tạo Firebase.</div>
      </CenteredView>
    );
  }

  /**
   * Giao diện FireCMS
   */
  return (
    <FireCMSi18nProvider>
      <SnackbarProvider>
        <ModeControllerProvider value={modeController}>
          <FireCMS
            navigationController={navigationController}
            authController={authController}
            userConfigPersistence={userConfigPersistence}
            dataSourceDelegate={firestoreDelegate}
            storageSource={storageSource}
          >
            {({ loading }) => {
              /**
               * Đang tải hệ thống hoặc Authentication
               */
              if (loading || authLoading) {
                return <CircularProgressCenter size="large" />;
              }

              /**
               * Chưa đăng nhập hoặc không đúng email admin
               */
              if (!canAccessMainView) {
                return (
                  <FirebaseLoginView
                    authController={authController}
                    firebaseApp={firebaseApp}
                    signInOptions={signInOptions}
                    notAllowedError={notAllowedError}
                  />
                );
              }

              /**
               * Dashboard CMS
               */
              return (
                <Scaffold autoOpenDrawer={false}>
                  <AppBar title="Quản trị Web" />

                  <Drawer />

                  <NavigationRoutes />

                  <SideDialogs />
                </Scaffold>
              );
            }}
          </FireCMS>
        </ModeControllerProvider>
      </SnackbarProvider>
    </FireCMSi18nProvider>
  );
}

export default App;
