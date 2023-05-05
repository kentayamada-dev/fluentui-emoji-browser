FROM node:18.12.1-bullseye-slim

ENV TZ="Asia/Tokyo"
ENV SHELL=/bin/zsh

ARG USERNAME=vscode
ARG USER_UID=1001
ARG USER_GID=$USER_UID
ARG WORKSPACE_NAME

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID --create-home $USERNAME \
    && apt-get update && apt-get --yes install --no-install-recommends sudo ca-certificates zsh git fzf bat fd-find locales-all zip exa \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    && npm install --global pnpm

USER $USERNAME
SHELL ["/bin/zsh", "-c"]
RUN ln -s /workspaces/$WORKSPACE_NAME/.devcontainer/.zshrc ~/.zshrc \
    && git clone --depth 1 -- https://github.com/z-shell/F-Sy-H ~/fsh \
    && git clone --depth 1 -- https://github.com/olets/zsh-abbr ~/abbr
