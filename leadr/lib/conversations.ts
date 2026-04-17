import { supabase } from "./supabase";

export async function createConversation(agentId: string, title?: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("conversations")
    .insert({
      user_id: user.id,
      agent_id: agentId,
      title: title || "New conversation",
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating conversation:", error);
    return null;
  }
  return data;
}

export async function saveMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string
) {
  const { error } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    role,
    content,
  });

  if (error) {
    console.error("Error saving message:", error);
  }
}

export async function getConversations() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
  return data;
}

export async function getLastConversation(agentId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Get the most recent conversation for this agent
  const { data: conversation } = await supabase
    .from("conversations")
    .select("id, title, created_at")
    .eq("user_id", user.id)
    .eq("agent_id", agentId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .single();

  if (!conversation) return null;

  // Get the messages from that conversation
  const { data: messages } = await supabase
    .from("messages")
    .select("role, content, created_at")
    .eq("conversation_id", conversation.id)
    .order("created_at", { ascending: true });

  return {
    conversation,
    messages: messages || [],
  };
}
