package createsession

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"cloud.google.com/go/firestore"
	"k8s.io/klog"

	"github.com/roleypoly/roleypoly/src/common"
	"github.com/roleypoly/roleypoly/src/common/types"
)

var (
	firestoreClient   *firestore.Client
	projectID         = common.Getenv("GCP_PROJECT_ID").String()
	firestoreEndpoint = common.Getenv("FIRESTORE_ENDPOINT").String()
)

func init() {
	var err error // shadow avoidance

	ctx := context.Background()
	firestoreClient, err = firestore.NewClient(ctx, projectID)
	if err != nil {
		panic(err)
	}
}

func CreateSession(rw http.ResponseWriter, req *http.Request) {
	requestData := types.CreateSessionRequest{}
	json.NewDecoder(req.Body).Decode(&requestData)

	klog.Info("Creating session...")

	sessionData := types.SessionData{
		AccessTokens: requestData.AccessTokenResponse,
		Fingerprint:  requestData.Fingerprint,
		UserData:     types.UserData{},
	}

	ctx, ctxCancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer ctxCancel()

	docRef, _, err := firestoreClient.Collection("sessions").Add(ctx, sessionData)
	if err != nil {
		rw.WriteHeader(500)
		klog.Error("error: create session in firestore: ", err)
	}

	klog.Info("Created session ", docRef.ID)

	responseData := types.CreateSessionResponse{
		SessionID: docRef.ID,
	}
	json.NewEncoder(rw).Encode(responseData)
}
