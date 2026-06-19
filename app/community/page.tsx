"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Camera,
  Compass,
  Heart,
  MessageCircle,
  Route,
  Send,
  Share2,
  Sparkles,
} from "lucide-react";
import type { SocialKind, SocialPost } from "@/types";
import { useApp } from "@/lib/providers";
import { attractions, experiences, hotels, restaurants } from "@/lib/data";
import { L, cn, formatDate } from "@/lib/utils";
import { SectionTitle, ThemeChip } from "@/components/ui";
import { ScenicArt } from "@/components/ScenicArt";

const KIND_ICON: Record<SocialKind, React.ComponentType<{ size?: number; className?: string }>> = {
  itinerary: Route,
  photo: Camera,
  tip: Sparkles,
};

function findSpot(id: string) {
  return (
    attractions.find((a) => a.id === id) ??
    experiences.find((e) => e.id === id) ??
    hotels.find((h) => h.id === id) ??
    restaurants.find((r) => r.id === id) ??
    null
  );
}

function spotHref(id: string): string | null {
  if (attractions.some((a) => a.id === id)) return `/explore/${id}`;
  if (hotels.some((h) => h.id === id)) return `/hotels/${id}`;
  if (restaurants.some((r) => r.id === id)) return `/restaurants/${id}`;
  if (experiences.some((e) => e.id === id)) return `/experiences`;
  return null;
}

export default function CommunityPage() {
  const { t, lang, posts, likedPosts, toggleLike, addPost, addComment } = useApp();
  const [filter, setFilter] = React.useState<SocialKind | "all">("all");
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [kind, setKind] = React.useState<SocialKind>("itinerary");

  const filtered = posts.filter((p) => (filter === "all" ? true : p.kind === filter));

  function onPost(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    addPost({ title: title.trim(), body: body.trim(), kind });
    setTitle("");
    setBody("");
  }

  return (
    <div className="space-y-10">
      <SectionTitle level={1} eyebrow={t("nav.community")} title={t("community.title")} />
      <p className="-mt-6 max-w-2xl text-sm text-ink-soft dark:text-beige-200/70">{t("community.subtitle")}</p>

      <section className="card p-5">
        <SectionTitle title={t("community.compose")} />
        <form onSubmit={onPost} className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("community.composeTitle")}
            className="w-full rounded-xl border border-forest-900/10 bg-beige-50/60 px-3 py-2 text-sm outline-none focus:border-forest-500 dark:border-beige-50/10 dark:bg-charcoal-800/60"
            maxLength={120}
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={t("community.composeBody")}
            rows={3}
            className="w-full rounded-xl border border-forest-900/10 bg-beige-50/60 px-3 py-2 text-sm outline-none focus:border-forest-500 dark:border-beige-50/10 dark:bg-charcoal-800/60"
            maxLength={800}
          />
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-medium text-ink-soft dark:text-beige-200/70">{t("community.composeKind")}</span>
            {(["itinerary", "photo", "tip"] as const).map((k) => {
              const active = kind === k;
              const Icon = KIND_ICON[k];
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKind(k)}
                  className={cn(
                    "chip cursor-pointer transition",
                    active
                      ? "bg-forest-600 text-beige-50 dark:bg-gold-400 dark:text-charcoal-950"
                      : "bg-forest-100 text-forest-800 hover:bg-forest-200 dark:bg-charcoal-800 dark:text-beige-200/80 dark:hover:bg-charcoal-700"
                  )}
                >
                  <Icon size={12} className="mr-1 inline" />
                  {t(`community.composeKind.${k}` as const)}
                </button>
              );
            })}
            <button
              type="submit"
              disabled={!title.trim() || !body.trim()}
              className="btn-primary ml-auto h-9 px-4 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={14} className="mr-1" />
              {t("community.post")}
            </button>
          </div>
          <p className="text-[11px] text-ink-soft dark:text-beige-200/60">{t("community.guidelines")}</p>
        </form>
      </section>

      <section>
        <SectionTitle title={t("community.feed")} />
        <div className="mb-4 flex flex-wrap gap-1.5">
          {(
            [
              { key: "all", label: t("community.filterAll"), icon: Compass },
              { key: "itinerary", label: t("community.filterItinerary"), icon: Route },
              { key: "photo", label: t("community.filterPhoto"), icon: Camera },
              { key: "tip", label: t("community.filterTip"), icon: Sparkles },
            ] as const
          ).map(({ key, label, icon: Icon }) => {
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={cn(
                  "chip cursor-pointer transition",
                  active
                    ? "bg-forest-600 text-beige-50 dark:bg-gold-400 dark:text-charcoal-950"
                    : "bg-forest-100 text-forest-800 hover:bg-forest-200 dark:bg-charcoal-800 dark:text-beige-200/80 dark:hover:bg-charcoal-700"
                )}
              >
                <Icon size={12} className="mr-1 inline" />
                {label}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-forest-900/10 p-6 text-center text-sm text-ink-soft dark:border-beige-50/10 dark:text-beige-200/70">
            {t("community.empty")}
          </p>
        ) : (
          <ul className="space-y-5">
            {filtered.map((post, i) => (
              <motion.li
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <PostCard
                  post={post}
                  liked={likedPosts.includes(post.id)}
                  onLike={() => toggleLike(post.id)}
                  onComment={(text) => addComment(post.id, text)}
                  lang={lang}
                  tCommunity={{
                    like: t("community.like"),
                    liked: t("community.liked"),
                    likes: t("community.likes"),
                    comments: t("community.comments"),
                    share: t("community.share"),
                    shared: t("community.shared"),
                    add: t("community.addComment"),
                    send: t("community.send"),
                    spots: t("community.spots"),
                    author: t("community.author"),
                  }}
                />
              </motion.li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function PostCard({
  post,
  liked,
  onLike,
  onComment,
  lang,
  tCommunity,
}: {
  post: SocialPost;
  liked: boolean;
  onLike: () => void;
  onComment: (text: string) => void;
  lang: "en" | "ja";
  tCommunity: {
    like: string;
    liked: string;
    likes: string;
    comments: string;
    share: string;
    shared: string;
    add: string;
    send: string;
    spots: string;
    author: string;
  };
}) {
  const [comment, setComment] = React.useState("");
  const [shared, setShared] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const Icon = KIND_ICON[post.kind];

  function submitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;
    onComment(comment.trim());
    setComment("");
    setShowComments(true);
  }

  function share() {
    const url = typeof window !== "undefined" ? `${window.location.origin}/community#${post.id}` : "";
    if (typeof navigator !== "undefined" && navigator.clipboard && url) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    setShared(true);
    window.setTimeout(() => setShared(false), 1600);
  }

  return (
    <article id={post.id} className="card overflow-hidden">
      <div className="h-32 overflow-hidden">
        <ScenicArt art={post.art} className="h-full w-full" />
      </div>
      <div className="space-y-3 p-5">
        <header className="flex flex-wrap items-center gap-2 text-xs text-ink-soft dark:text-beige-200/70">
          <span className="inline-flex items-center gap-1 rounded-full bg-forest-100 px-2 py-0.5 font-medium text-forest-800 dark:bg-charcoal-800 dark:text-beige-200/80">
            <Icon size={11} />
            {post.kind}
          </span>
          <span className="font-medium text-ink dark:text-beige-50/90">{post.author}</span>
          {post.nationality && <span>· {L(post.nationality, lang)}</span>}
          <span>· {formatDate(post.date, lang)}</span>
          {post.themes.map((th) => (
            <ThemeChip key={th} theme={th} />
          ))}
        </header>

        <h3 className="font-display text-lg font-semibold tracking-tight">{L(post.title, lang)}</h3>
        <p className="text-sm leading-relaxed">{L(post.body, lang)}</p>

        {post.spots.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-ink-soft dark:text-beige-200/70">{tCommunity.spots}</p>
            <div className="flex flex-wrap gap-1.5">
              {post.spots.map((id) => {
                const spot = findSpot(id);
                const href = spotHref(id);
                const label = spot ? L(spot.name, lang) : id;
                if (!href) {
                  return (
                    <span key={id} className="chip bg-beige-100 text-ink-soft dark:bg-charcoal-800 dark:text-beige-200/70">
                      {label}
                    </span>
                  );
                }
                return (
                  <Link
                    key={id}
                    href={href}
                    className="chip bg-beige-100 text-forest-700 hover:bg-forest-100 dark:bg-charcoal-800 dark:text-gold-300 dark:hover:bg-charcoal-700"
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            type="button"
            onClick={onLike}
            className={cn(
              "btn-ghost h-9 px-3 text-sm",
              liked && "text-rose-500 dark:text-rose-300"
            )}
            aria-pressed={liked}
          >
            <Heart size={14} className={cn(liked && "fill-current")} />
            {post.likes} {tCommunity.likes}
          </button>
          <button
            type="button"
            onClick={() => setShowComments((s) => !s)}
            className="btn-ghost h-9 px-3 text-sm"
          >
            <MessageCircle size={14} />
            {post.comments.length} {tCommunity.comments}
          </button>
          <button type="button" onClick={share} className="btn-ghost h-9 px-3 text-sm">
            <Share2 size={14} />
            {shared ? tCommunity.shared : tCommunity.share}
          </button>
        </div>

        {showComments && (
          <div className="space-y-3 border-t border-forest-900/10 pt-3 dark:border-beige-50/10">
            {post.comments.length > 0 && (
              <ul className="space-y-2">
                {post.comments.map((c) => (
                  <li key={c.id} className="rounded-xl bg-beige-50/60 px-3 py-2 dark:bg-charcoal-800/60">
                    <div className="mb-0.5 text-xs text-ink-soft dark:text-beige-200/70">
                      <span className="font-medium text-ink dark:text-beige-50/90">{c.author}</span>
                      <span> · {formatDate(c.date, lang)}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{c.text}</p>
                  </li>
                ))}
              </ul>
            )}
            <form onSubmit={submitComment} className="flex gap-2">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={tCommunity.add}
                maxLength={280}
                className="flex-1 rounded-xl border border-forest-900/10 bg-beige-50/60 px-3 py-2 text-sm outline-none focus:border-forest-500 dark:border-beige-50/10 dark:bg-charcoal-800/60"
              />
              <button
                type="submit"
                disabled={!comment.trim()}
                className="btn-primary h-9 px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={14} />
                {tCommunity.send}
              </button>
            </form>
          </div>
        )}
      </div>
    </article>
  );
}
