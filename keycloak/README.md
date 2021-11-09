# Keycloak settings

Here you can find realm settings (`realm-export.json`) with predefined test users. This folder is connected via docker-compose volumes.

If you want to update this file then you need to access shell in the running container:

```console
docker-compose -f docker-compose.services.yml exec identity-provider sh
```

And then you need to call this export command (DON'T FORGET this part `-Djboss.socket.binding.port-offset=100`!):

```console
/opt/jboss/keycloak/bin/standalone.sh -Djboss.socket.binding.port-offset=100 -Dkeycloak.migration.action=export -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.file=/opt/jboss/keycloak/imports/realm-export2.json -Dkeycloak.migration.usersExportStrategy=REALM_FILE
```

After shutting the container down you can replace `realm-export.json` with `realm-export2.json` file.

_Docs:_

- [docker hub](https://hub.docker.com/r/jboss/keycloak/)
- [keycloak docs](https://www.keycloak.org/docs/latest/server_admin/index.html#_export_import)

The Keycloak docker image is complete crap with many problem, e.g. be aware of these:

- [https://stackoverflow.com/a/66964764/10735867](https://stackoverflow.com/a/66964764/10735867).
- [upload scripts](https://stackoverflow.com/a/66964764/10735867)
