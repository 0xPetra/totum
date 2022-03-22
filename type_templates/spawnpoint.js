import * as THREE from 'three';
import metaversefile from 'metaversefile';
const {useApp, useInternals, useCleanup, useLocalPlayer} = metaversefile;

export default e => {
  const app = useApp();
  app.appType = 'spawnpoint';
  
  const srcUrl = ${this.srcUrl};
  const mode = app.getComponent('mode') ?? 'attached';
  console.log('spawn point mode', app.getComponent('mode'), mode);
  if (mode === 'attached') {
    (async () => {
      const res = await fetch(srcUrl);
      const j = await res.json();
      if (j) {
        
        const localPlayer = useLocalPlayer();
        const {camera} = useInternals();

        if (j.position) {
          localPlayer.position.fromArray(j.position);
        }
        if (j.quaternion) {
          localPlayer.quaternion.fromArray(j.quaternion);
          camera.quaternion.fromArray(j.quaternion);
        }
      }
    })();
    
    /* useCleanup(() => {
    }); */
  }

  return app;
};
export const contentId = ${this.contentId};
export const name = ${this.name};
export const description = ${this.description};
export const components = ${this.components};