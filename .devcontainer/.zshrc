# prompt
# https://github.com/ohmyzsh/ohmyzsh/issues/7945#:~:text=Do%20this%3A-,PROMPT%3D%27%25%7B%25G%F0%9F%A6%80%25%7D%27,-%27%25%7B%25G...%25%7D%27%20tells
# https://0g0.org/category/2500-257F/1/
PROMPT='%F{25}┏━'$'\ue0b6''%f%K{25}%F{231}%n%k%f%K{239}%F{25}'$'\ue0b4''%f%F{255} %~%k%F{239}'$'\ue0b4''%f
%F{25}┗'$'\ue0b0'' %f'

# history
HISTFILE=~/.zsh_history
HISTORY_IGNORE="pwd|(ls|cd|cat)*"
HISTSIZE=10000
SAVEHIST=1000000
setopt hist_ignore_dups
setopt hist_ignore_all_dups
setopt share_history

# https://qiita.com/sho-t/items/d44bfbc783db7ca278c0
zshaddhistory() {
  emulate -L zsh
  [[ ${1%%$'\n'} != ${~HISTORY_IGNORE} ]]
}

select-history() {
  BUFFER=$(history -n -r 1 | fzf --color 'pointer:#32CD32,prompt:#32CD32,fg+:#32CD32,bg+:-1,gutter:-1' --exact --reverse --query="$LBUFFER" --prompt="🔎 " --info=hidden)
  CURSOR=${#BUFFER}
}

zle -N select-history
bindkey '^r' select-history

# blank line
precmd() {
    if [ -z "$NEW_LINE_BEFORE_PROMPT" ]; then
        NEW_LINE_BEFORE_PROMPT=1
    elif [ "$NEW_LINE_BEFORE_PROMPT" -eq 1 ]; then
        echo ""
    fi
}

# alias
source ~/abbr/zsh-abbr.zsh
abbr --session --quieter la="ls -a --color=auto -F"
abbr --session --force --quieter cat="batcat"

# preview file
FZF_DEFAULT_COMMAND='fdfind --type f --max-depth=1 --hidden'

preview-file() {
  BUFFER=$(eval "$FZF_DEFAULT_COMMAND" | fzf --preview "batcat --color=always --style=header,grid {}" --preview-window=80% --color 'pointer:#32CD32,prompt:#32CD32,fg+:#32CD32,bg+:-1,gutter:-1' --exact --reverse --query="$LBUFFER" --prompt="🔎 " --info=hidden)
  CURSOR=${#BUFFER}
}

zle -N preview-file
bindkey '^l' preview-file

# syntax highlighting
source ~/fsh/F-Sy-H.plugin.zsh

# pnpm
export PNPM_HOME="/home/vscode/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"
# pnpm end