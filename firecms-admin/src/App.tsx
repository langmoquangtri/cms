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
import { projectsCollection } from './collections/projects';

import { firebaseConfig } from './firebase_config';

function App() {
  /**
   * Cho phép mọi tài khoản đã đăng nhập thành công
   * bằng Firebase Email/Password truy cập CMS.
   */
  const myAuthenticator: Authenticator<FirebaseUserWrapper> = useCallback(
    async ({ user }) => {
      return Boolean(user?.email);
    },
    []
  );

  /**
   * Các collection hiển thị trong CMS
   */
  const collections = useMemo(
    () => [
      categoriesCollection,
      productsCollection,
      projectsCollection,
    ],
    []
  );

  /**
   * Khởi tạo Firebase
   */
  const {
    firebaseApp,
    firebaseConfigLoading,
    configError,
  } = useInitialiseFirebase({
    firebaseConfig,
  });

  /**
   * Dark / Light mode
   */
  const modeController = useBuildModeController();

  /**
   * Chỉ đăng nhập bằng Email / Password
   */
  const signInOptions: FirebaseSignInProvider[] = ['password'];

  /**
   * Firebase Authentication
   */
  const authController: FirebaseAuthController =
    useFirebaseAuthController({
      firebaseApp,
      signInOptions,
    });

  /**
   * Lưu preference của người dùng
   */
  const userConfigPersistence =
    useBuildLocalConfigurationPersistence();

  /**
   * Kết nối Firestore
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
   * Kiểm tra trạng thái đăng nhập
   */
  const {
    authLoading,
    canAccessMainView,
    notAllowedError,
  } = useValidateAuthenticator({
    authController,
    authenticator: myAuthenticator,
    dataSourceDelegate: firestoreDelegate,
    storageSource,
  });

  /**
   * Navigation CMS
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
   * Firebase config lỗi
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
        <div style={{ padding: 24 }}>
          Không thể khởi tạo Firebase.
        </div>
      </CenteredView>
    );
  }

  /**
   * Giao diện CMS
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
              if (loading || authLoading) {
                return (
                  <CircularProgressCenter size="large" />
                );
              }

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