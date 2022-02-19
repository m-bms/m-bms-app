import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import ICON_SORT_ASCENDING from 'bootstrap-icons/icons/sort-alpha-down.svg'
import ICON_SORT_DESCENDING from 'bootstrap-icons/icons/sort-alpha-up-alt.svg'
import ICON_SORT_OLDEST from 'bootstrap-icons/icons/sort-down.svg'
import ICON_SORT_NEWEST from 'bootstrap-icons/icons/sort-up-alt.svg'
import { syncOutline } from 'ionicons/icons'
import { useState } from 'react'
import { useSnapshot } from 'valtio'
import { findDevice, Sort } from './FindDevice.state'

const sortIcons = {
  [Sort.ASCENDING]: ICON_SORT_ASCENDING,
  [Sort.DESCENDING]: ICON_SORT_DESCENDING,
  [Sort.OLDEST]: ICON_SORT_OLDEST,
  [Sort.NEWEST]: ICON_SORT_NEWEST,
}

export const FindDevice = () => {
  const { sort } = useSnapshot(findDevice)
  const [sortShow, setSortShow] = useState(false)

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Find Device</IonTitle>

          <IonButtons slot="secondary">
            <IonButton onClick={() => setSortShow(true)}>
              <IonIcon src={sortIcons[sort]} slot="icon-only" />
            </IonButton>
          </IonButtons>

          <IonButtons slot="primary">
            <IonButton>
              <IonIcon src={syncOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent></IonContent>

      <IonAlert
        isOpen={sortShow}
        onDidDismiss={({ detail }) => {
          setSortShow(false)
          if (detail.role) return
          findDevice.sort = detail.data.values
        }}
        header="Sort"
        buttons={['Cancel', 'OK']}
        inputs={[
          {
            type: 'radio',
            label: 'Ascending',
            value: Sort.ASCENDING,
            checked: sort === Sort.ASCENDING,
          },
          {
            type: 'radio',
            label: 'Descending',
            value: Sort.DESCENDING,
            checked: sort === Sort.DESCENDING,
          },
          {
            type: 'radio',
            label: 'Oldest',
            value: Sort.OLDEST,
            checked: sort === Sort.OLDEST,
          },
          {
            type: 'radio',
            label: 'Newest',
            value: Sort.NEWEST,
            checked: sort === Sort.NEWEST,
          },
        ]}
      />
    </>
  )
}
