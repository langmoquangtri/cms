import React, { useCallback, useMemo } from "react";

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
} from "@firecms/core";

import {
  FirebaseAuthController,
  FirebaseLoginView,
  FirebaseSignInProvider,
  FirebaseUserWrapper,
  useFirebaseAuthController,
  useFirebaseStorageSource,
  useFirestoreDelegate,
  useInitialiseFirebase,
} from "@firecms/firebase";

import { CenteredView } from "@firecms/ui";

import { bannersCollection } from "./collections/banners";
import { categoriesCollection } from "./collections/categories";
import { postsCollection } from "./collections/posts";
import { productsCollection } from "./collections/products";
import { projectsCollection } from "./collections/projects";
import { firebaseConfig } from "./firebase_config";

function App() {
  const authenticator: Authenticator<FirebaseUserWrapper> = useCallback(
    async ({ user }) => Boolean(user?.email),
    []
  );

  const collections = useMemo(
    () => [
      categoriesCollection,
      productsCollection,
      projectsCollection,
      postsCollection,
      bannersCollection,
    ],
    []
  );

  const { firebaseApp, firebaseConfigLoading, configError } =
    useInitialiseFirebase({
      firebaseConfig,
    });

  const modeController = useBuildModeController();

  const signInOptions: FirebaseSignInProvider[] = ["password"];

  const authController: FirebaseAuthController = useFirebaseAuthController({
    firebaseApp,
    signInOptions,
  });

  const userConfigPersistence = useBuildLocalConfigurationPersistence();

  const firestoreDelegate = useFirestoreDelegate({
    firebaseApp,
  });

  const storageSource = useFirebaseStorageSource({
    firebaseApp,
  });

  const { authLoading, canAccessMainView, notAllowedError } =
    useValidateAuthenticator({
      authController,
      authenticator,
      dataSourceDelegate: firestoreDelegate,
      storageSource,
    });

  const navigationController = useBuildNavigationController({
    disabled: authLoading,
    collections,
    authController,
    dataSourceDelegate: firestoreDelegate,
  });

  if (firebaseConfigLoading) {
    return <CircularProgressCenter />;
  }

  if (configError) {
    return (
      <CenteredView>
        <div style={{ padding: 24, maxWidth: 760 }}>
          <h2>Lỗi cấu hình Firebase</h2>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {String(configError)}
          </pre>
        </div>
      </CenteredView>
    );
  }

  if (!firebaseApp) {
    return (
      <CenteredView>
        <div style={{ padding: 24 }}>Không thể khởi tạo Firebase.</div>
      </CenteredView>
    );
  }

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
                return <CircularProgressCenter size="large" />;
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